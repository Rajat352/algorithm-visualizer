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
  const [animationSpeed, setAnimationSpeed] = useState(500);

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

  const ANIMATION_SPEED_MS = animationSpeed;
  const PRIMARY_COLOR = "rgba(169, 92, 232, 0.8)";
  const SECONDARY_COLOR = "lightgreen";
  const TERTIARY_COLOR = "coral";

  function mergeSort() {
    const [animations, pseudoCode] = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bars");

      const existingText = document.getElementById("code-container").innerHTML;
      if (existingText == "<u>PSEUDOCODE:</u>") {
        document.getElementById("code-container").innerHTML =
          existingText + "<pre>" + pseudoCode + "</pre>";
      }

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
    const [moves, pseudoCode] = bubbleSort([...array]);
    animateBubbleSort(moves, pseudoCode);
  };

  function animateBubbleSort(moves, pseudoCode = "") {
    if (moves.length == 0) {
      return;
    }

    const existingText = document.getElementById("code-container").innerHTML;
    document.getElementById("code-container").innerHTML =
      existingText + "<pre>" + pseudoCode + "</pre>";

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
    const color = move.type == "swap" ? SECONDARY_COLOR : TERTIARY_COLOR;

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
    const [moves, pseudoCode] = selectionSort([...array]);
    animateSelectionSort(moves, pseudoCode);
  };

  function animateSelectionSort(moves, pseudoCode = "") {
    if (moves.length == 0) {
      return;
    }

    const existingText = document.getElementById("code-container").innerHTML;
    document.getElementById("code-container").innerHTML =
      existingText + "<pre>" + pseudoCode + "</pre>";

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

    const color = move.type == "swap" ? SECONDARY_COLOR : TERTIARY_COLOR;

    thisBar[i].style.backgroundColor = color;
    thisBar[j].style.backgroundColor = color;

    setTimeout(() => {
      thisBar[i].style.backgroundColor = PRIMARY_COLOR;
      thisBar[j].style.backgroundColor = PRIMARY_COLOR;
      animateSelectionSort(moves);
    }, ANIMATION_SPEED_MS);
  }

  const insertionSortArray = () => {
    const [moves, pseudoCode] = insertionSort([...array]);
    animateInsertionSort(moves, pseudoCode);
  };

  function animateInsertionSort(moves, pseudoCode = "") {
    if (moves.length == 0) {
      return;
    }

    const existingText = document.getElementById("code-container").innerHTML;
    document.getElementById("code-container").innerHTML =
      existingText + "<pre>" + pseudoCode + "</pre>";

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

    const color = move.type == "swap" ? SECONDARY_COLOR : TERTIARY_COLOR;

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
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <div className="body-container">
        <div id="code-container">
          <u>PSEUDOCODE:</u>
        </div>
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
        <div className="color-container"></div>
      </div>
    </div>
  );

  function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
