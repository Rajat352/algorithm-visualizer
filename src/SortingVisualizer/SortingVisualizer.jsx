import "./SortingVisualizer.css";

import { useEffect, useState } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const randomArray = [];
    for (let i = 0; i < 100; i++) {
      randomArray.push(randomIntegerFromInterval(5, 300));
    }
    setArray(randomArray);
  }, []);

  const numBars = array.length;
  const barWidth = 100 / numBars;

  return (
    <div className="bars-container">
      {array.map((value, index) => (
        <div
          className="bars"
          key={index}
          style={{ height: `${value}px`, width: `${barWidth}` }}
        ></div>
      ))}
    </div>
  );
}
