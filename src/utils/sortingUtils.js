export const generateRandomArray = (size, min, max) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
  };
  
  export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  export const quickSort2 = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const partition = async (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        setInspectedIndex(j);
        playColumnSound(arr[j]);
        setComparisons(prev => prev + 1);
        await sleep(delay);
  
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }
  
      setInspectedIndex(high);
      playColumnSound(arr[high]);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      await sleep(delay);
  
      setInspectedIndex(-1);
      return i + 1;
    };
  
    const quickSortRecursive = async (arr, low, high) => {
      if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortRecursive(arr, low, pi - 1);
        await quickSortRecursive(arr, pi + 1, high);
      }
      return arr;
    };
  
    return await quickSortRecursive([...array], 0, array.length - 1);
  };
  
  export const bogoSort = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const isSorted = (arr) => {
      for (let i = 1; i < arr.length; i++) {
        setComparisons(prev => prev + 1);
        if (arr[i - 1] > arr[i]) {
          return false;
        }
      }
      return true;
    };
  
    const shuffle = async (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        const j = Math.floor(Math.random() * (i + 1));
        setInspectedIndex(i);
        playColumnSound(arr[i]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(delay);
      }
      setInspectedIndex(-1);
      return arr;
    };
  
    let sortedArray = [...array];
    while (!isSorted(sortedArray)) {
      sortedArray = await shuffle(sortedArray);
    }
    return sortedArray;
  };
  
  export const bubbleSort = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const arr = [...array];
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        setInspectedIndex(j);
        playColumnSound(arr[j]);
        setComparisons(prev => prev + 1);
        await sleep(delay);
  
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
    }
  
    setInspectedIndex(-1);
    return arr;
  };
  
  export const insertionSort = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const arr = [...array];
    const n = arr.length;
  
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        setInspectedIndex(j);
        playColumnSound(arr[j]);
        setComparisons(prev => prev + 1);
        await sleep(delay);
  
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  
    setInspectedIndex(-1);
    return arr;
  };
  
  export const selectionSort = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const arr = [...array];
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        setInspectedIndex(j);
        playColumnSound(arr[j]);
        setComparisons(prev => prev + 1);
        await sleep(delay);
  
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
      }
    }
  
    setInspectedIndex(-1);
    return arr;
  };
  
  export const mergeSort = async (array, setArray, setComparisons, delay, isPaused, setInspectedIndex, playColumnSound) => {
    const merge = async (arr, left, middle, right) => {
      const n1 = middle - left + 1;
      const n2 = right - middle;
      const L = arr.slice(left, middle + 1);
      const R = arr.slice(middle + 1, right + 1);
  
      let i = 0, j = 0, k = left;
  
      while (i < n1 && j < n2) {
        if (await isPaused()) {
          await new Promise(resolve => {
            const pauseCheck = setInterval(() => {
              if (!isPaused()) {
                clearInterval(pauseCheck);
                resolve();
              }
            }, 100);
          });
        }
  
        setInspectedIndex(k);
        playColumnSound(arr[k]);
        setComparisons(prev => prev + 1);
        await sleep(delay);
  
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
        setArray([...arr]);
      }
  
      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        setArray([...arr]);
        await sleep(delay);
      }
  
      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        setArray([...arr]);
        await sleep(delay);
      }
    };
  
    const mergeSortRecursive = async (arr, left, right) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSortRecursive(arr, left, middle);
        await mergeSortRecursive(arr, middle + 1, right);
        await merge(arr, left, middle, right);
      }
    };
  
    const arr = [...array];
    await mergeSortRecursive(arr, 0, arr.length - 1);
    setInspectedIndex(-1);
    return arr;
  };