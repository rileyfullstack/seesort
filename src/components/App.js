import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ControlPanel from './ControlPanel';
import SortingVisualizer from './SortingVisualizer';
import { 
  generateRandomArray, 
  sleep, 
  quickSort2, 
  bogoSort, 
  bubbleSort, 
  insertionSort, 
  selectionSort, 
  mergeSort 
} from '../utils/sortingUtils';
import { playSound, getFrequency } from '../utils/soundUtils';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const ComparisonCounter = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const App = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [algorithm, setAlgorithm] = useState('quickSort2');
  const [arraySize, setArraySize] = useState(50);
  const [delay, setDelay] = useState(1);
  const [comparisons, setComparisons] = useState(0);
  const [inspectedIndex, setInspectedIndex] = useState(-1);
  const [completedIndices, setCompletedIndices] = useState([]);
  
  const pausedRef = useRef(paused);
  const sortingRef = useRef(sorting);

  useEffect(() => {
    pausedRef.current = paused;
    sortingRef.current = sorting;
  }, [paused, sorting]);

  const generateArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize, 5, 500);
    setArray(newArray);
    setComparisons(0);
    setCompletedIndices([]);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const scrambleArray = (arr) => {
    const scrambledArray = [...arr];
    for (let i = scrambledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambledArray[i], scrambledArray[j]] = [scrambledArray[j], scrambledArray[i]];
    }
    return scrambledArray;
  };

  const playColumnSound = useCallback((value) => {
    const minValue = Math.min(...array);
    const maxValue = Math.max(...array);
    const frequency = getFrequency(value, minValue, maxValue);
    playSound(frequency);
  }, [array]);

  const handleStart = async () => {
    if (sorting && !paused) {
      setPaused(true);
      return;
    }
  
    if (paused) {
      setPaused(false);
      return;
    }
  
    setSorting(true);
    setPaused(false);
    setComparisons(0);
    setCompletedIndices([]);
  
    // Scramble the array
    const scrambledArray = scrambleArray(array);
    setArray(scrambledArray);
  
    // Visualize the scrambling process
    const steps = 20;
    for (let i = 0; i < steps; i++) {
      await sleep(50);
      setArray(prevArray => scrambleArray(prevArray));
    }
  
    await sleep(500);
  
    // Start sorting
    let sortedArray;
    const sortParams = [
      [...scrambledArray],
      setArray,
      setComparisons,
      delay,
      () => pausedRef.current,
      setInspectedIndex,
      playColumnSound
    ];
  
    switch (algorithm) {
      case 'quickSort2':
        sortedArray = await quickSort2(...sortParams);
        break;
      case 'bogoSort':
        sortedArray = await bogoSort(...sortParams);
        break;
      case 'bubbleSort':
        sortedArray = await bubbleSort(...sortParams);
        break;
      case 'insertionSort':
        sortedArray = await insertionSort(...sortParams);
        break;
      case 'selectionSort':
        sortedArray = await selectionSort(...sortParams);
        break;
      case 'mergeSort':
        sortedArray = await mergeSort(...sortParams);
        break;
      default:
        sortedArray = scrambledArray;
    }
  
    setArray(sortedArray);
    setSorting(false);
    setPaused(false);
    setInspectedIndex(-1);
  
    // Animate completion
    const totalGreeningTime = 2000; // 3 seconds
    const delayBetweenColumns = totalGreeningTime / sortedArray.length;
  
    for (let i = 0; i < sortedArray.length; i++) {
      setCompletedIndices(prev => [...prev, i]);
      playColumnSound(sortedArray[i]);
      await sleep(delayBetweenColumns);
    }
  };

  const handlePause = () => {
    setPaused(prev => !prev);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <AppContainer>
      <Title>SeeSort - Sorting Algorithm Visualizer</Title>
      <ControlPanel
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        arraySize={arraySize}
        setArraySize={setArraySize}
        delay={delay}
        setDelay={setDelay}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        sorting={sorting}
        paused={paused}
      />
      <SortingVisualizer 
        array={array} 
        inspectedIndex={inspectedIndex} 
        completedIndices={completedIndices}
      />
      <ComparisonCounter>Comparisons: {comparisons}</ComparisonCounter>
    </AppContainer>
  );
};

export default App;