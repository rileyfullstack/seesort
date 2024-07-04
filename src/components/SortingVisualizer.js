import React from 'react';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 500px;
  width: 100%;
  background-color: black;
  padding: 10px;
`;

const Column = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  margin-right: 1px;
  transition: height 0.1s ease, background-color 0.1s ease;
`;

const SortingVisualizer = ({ array, inspectedIndex, completedIndices }) => {
  const maxValue = Math.max(...array);
  const columnWidth = Math.floor(800 / array.length);

  return (
    <VisualizerContainer>
      {array.map((value, index) => (
        <Column
          key={index}
          height={Math.floor((value / maxValue) * 480)}
          width={columnWidth}
          color={
            completedIndices.includes(index)
              ? 'green'
              : index === inspectedIndex
              ? 'red'
              : 'white'
          }
        />
      ))}
    </VisualizerContainer>
  );
};

export default SortingVisualizer;