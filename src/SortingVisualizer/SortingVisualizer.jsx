import "./SortingVisualizer.css";
import SortingHeader from "./SortingHeader";
import bubbleSort from "../SortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import selectionSort from "../SortingAlgorithms/selectionSort";
import insertionSort from "../SortingAlgorithms/insertionSort";

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
      randomArray.push(randomIntegerFromInterval(10, 500));
    }
    setArray(randomArray);
  };

  const SECONDARY_COLOR = "red";
  const ANIMATION_SPEED_MS = 20;
  const PRIMARY_COLOR = "black";

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

  const bubbleSortArray = () => {
    const moves = bubbleSort([...array]);
    animateBubbleSort(moves);
  };

  function animateBubbleSort(moves) {
    if (moves.length == 0) {
      return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type == "swap") {
      setArray((prevArray) => {
        const newArray = [...prevArray];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        return newArray;
      });
    }

    const thisBar = document.getElementsByClassName("bars");
    // Set the backgroundColor of the bars for the compared elements
    const color = move.type == "swap" ? SECONDARY_COLOR : "blue";

    thisBar[i].style.backgroundColor = color;
    thisBar[j].style.backgroundColor = color;

    setTimeout(() => {
      // Set the backgroundColor of the bars back to the default color
      thisBar[i].style.backgroundColor = PRIMARY_COLOR;
      thisBar[j].style.backgroundColor = PRIMARY_COLOR;
      animateBubbleSort(moves);
    }, ANIMATION_SPEED_MS);
  }

  const selectionSortArray = () => {
    const moves = selectionSort([...array]);
    animateSelectionSort(moves);
  };

  function animateSelectionSort(moves) {
    if (moves.length == 0) {
      return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type == "swap") {
      setArray((prevArray) => {
        const newArray = [...prevArray];
        [newArray[j], newArray[i]] = [newArray[i], newArray[j]];
        return newArray;
      });
    }

    const thisBar = document.getElementsByClassName("bars");

    const color = move.type == "swap" ? SECONDARY_COLOR : "blue";

    thisBar[i].style.backgroundColor = color;
    thisBar[j].style.backgroundColor = color;

    setTimeout(() => {
      thisBar[i].style.backgroundColor = PRIMARY_COLOR;
      thisBar[j].style.backgroundColor = PRIMARY_COLOR;
      animateSelectionSort(moves);
    }, ANIMATION_SPEED_MS);
  }

  const insertionSortArray = () => {
    const moves = insertionSort([...array]);
    animateInsertionSort(moves);
  };

  function animateInsertionSort(moves) {
    if (moves.length == 0) {
      return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type == "swap") {
      setArray((prevArray) => {
        const newArray = [...prevArray];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        return newArray;
      });
    }

    const thisBar = document.getElementsByClassName("bars");

    const color = move.type == "swap" ? SECONDARY_COLOR : "blue";

    thisBar[i].style.backgroundColor = color;
    thisBar[j].style.backgroundColor = color;

    setTimeout(() => {
      thisBar[i].style.backgroundColor = PRIMARY_COLOR;
      thisBar[j].style.backgroundColor = PRIMARY_COLOR;
      animateInsertionSort(moves);
    }, ANIMATION_SPEED_MS);
  }

  return (
    <div>
      <SortingHeader
        generateArray={generateRandomArray}
        numberOfBars={numberOfBars}
        setNumberOfBars={setNumberOfBars}
        bubbleSort={bubbleSortArray}
        mergeSort={mergeSort}
        selectionSort={selectionSortArray}
        insertionSort={insertionSortArray}
      />
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bars"
            key={index}
            style={{
              height: `${value}px`,
              width: `${100 / numberOfBars}`,
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
