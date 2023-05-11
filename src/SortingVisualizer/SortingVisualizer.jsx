import "./SortingVisualizer.css";
import SortingHeader from "./SortingHeader";

import { useEffect, useState } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  const [numberOfBars, setNumberOfBars] = useState(50);

  useEffect(() => {
    generateRandomArray();
  }, [numberOfBars]);

  const generateRandomArray = () => {
    const randomArray = [];
    for (let i = 0; i < numberOfBars; i++) {
      randomArray.push(randomIntegerFromInterval(5, 300));
    }
    setArray(randomArray);
  };

  const numBars = array.length;
  const barWidth = 100 / numBars;

  return (
    <div>
      <SortingHeader
        generateArray={generateRandomArray}
        numberOfBars={numberOfBars}
        setNumberOfBars={setNumberOfBars}
      />
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bars"
            key={index}
            style={{ height: `${value}px`, width: `${barWidth}` }}
          ></div>
        ))}
      </div>
    </div>
  );

  function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
