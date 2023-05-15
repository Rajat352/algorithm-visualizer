export default function SortingHeader(props) {
  const {
    generateArray,
    numberOfBars,
    setNumberOfBars,
    bubbleSort,
    mergeSort,
    selectionSort,
    insertionSort,
    animationSpeed,
    setAnimationSpeed,
  } = props;

  const changeNumberOfBars = (event) => {
    setNumberOfBars(Number(event.target.value));
  };

  return (
    <div className="header-container">
      <div onClick={generateArray} className="generate-new-array-btn">
        Generate New Array
      </div>
      <div>
        <label htmlFor="change-size">Change Array Size:</label>
        <input
          id="change-size"
          type="range"
          min={5}
          max={100}
          value={numberOfBars}
          onChange={changeNumberOfBars}
        />
      </div>
      <div>
        <label htmlFor="change-animation-speed">Change Animation Speed:</label>
        <input
          id="change-animation-speed"
          type="range"
          min="20"
          max="900"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
        />
      </div>
      <div onClick={bubbleSort}>Bubble Sort</div>
      <div onClick={mergeSort}>Merge Sort</div>
      <div onClick={insertionSort}>Insertion Sort</div>
      <div onClick={selectionSort}>Selection Sort</div>
    </div>
  );
}
