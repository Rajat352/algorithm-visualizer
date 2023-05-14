export default function SortingHeader(props) {
  const {
    generateArray,
    numberOfBars,
    setNumberOfBars,
    bubbleSort,
    mergeSort,
    selectionSort,
  } = props;

  const changeNumberOfBars = (event) => {
    setNumberOfBars(Number(event.target.value));
  };

  return (
    <div className="header-container">
      <button onClick={generateArray} className="generate-new-array-btn">
        Generate New Array
      </button>
      <label htmlFor="change-size">Change Array Size: </label>
      <input
        id="change-size"
        type="range"
        min={5}
        max={100}
        value={numberOfBars}
        onChange={changeNumberOfBars}
        style={{ backgroundColor: "white", cursor: "pointer" }}
      />
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button>Insertion Sort</button>
      <button onClick={selectionSort}>Selection Sort</button>
    </div>
  );
}
