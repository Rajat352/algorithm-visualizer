import "./SortingVisualizer.css";
import SortingHeader from "./SortingHeader";
import bubbleSort from "../SortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";

import { useEffect, useState } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  const [numberOfBars, setNumberOfBars] = useState(70);

  useEffect(() => {
    generateRandomArray();
  }, [numberOfBars]);

  const generateRandomArray = () => {
    const randomArray = [];
    for (let i = 0; i < numberOfBars; i++) {
      randomArray.push(randomIntegerFromInterval(10, 700));
    }
    setArray(randomArray);
  };

  const numBars = array.length;
  const barWidth = 100 / numBars;

  const SECONDARY_COLOR = "red";
  const ANIMATION_SPEED_MS = 10;
  const PRIMARY_COLOR = "turquoise";

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bars");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  return (
    <div>
      <SortingHeader
        generateArray={generateRandomArray}
        numberOfBars={numberOfBars}
        setNumberOfBars={setNumberOfBars}
        mergeSort={mergeSort}
      />
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bars"
            key={index}
            style={{
              height: `${value}px`,
              width: `${barWidth}`,
              backgroundColor: PRIMARY_COLOR,
            }}
          ></div>
        ))}
      </div>
    </div>
  );

  function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
