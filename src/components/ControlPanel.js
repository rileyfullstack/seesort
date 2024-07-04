import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Input = styled.input`
  padding: 5px;
  width: 60px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: background-color 0.3s, opacity 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#45a049'};
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  margin-left: 10px;
`;

const ControlPanel = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  delay,
  setDelay,
  onStart,
  onPause,
  onReset,
  sorting,
  paused
}) => {
  const [error, setError] = React.useState('');

  const handleArraySizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    if (size >= 2 && size <= 1000) {
      setArraySize(size);
      setError('');
    } else {
      setArraySize(size);
      setError('Array size should be between 2 and 1000');
    }
  };

  const isStartDisabled = sorting || error !== '';

  return (
    <Panel onClick={() => setError('')}>
      <Row>
        <Label>
          Sorting Algorithm:
          <Select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={sorting}
          >
            <option value="quickSort2">Quick Sort</option>
            <option value="bogoSort">Bogo Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="mergeSort">Merge Sort</option>
          </Select>
        </Label>
        <Label>
          Array Size (2-1000):
          <Input 
            type="number" 
            value={arraySize} 
            onChange={handleArraySizeChange}
            disabled={sorting}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Label>
        <Label>
          Delay (ms):
          <Input 
            type="number" 
            value={delay} 
            onChange={(e) => setDelay(parseInt(e.target.value, 10))} 
            min="1"
            disabled={sorting}
          />
        </Label>
      </Row>
      <Row>
        <Button onClick={onStart} disabled={isStartDisabled}>
          {sorting && !paused ? 'Pause' : paused ? 'Resume' : 'Start'}
        </Button>
        <Button onClick={onPause} disabled={!sorting}>
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </Row>
    </Panel>
  );
};

export default ControlPanel;