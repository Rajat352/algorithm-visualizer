export default function insertionSort(array) {
  const moves = [];
  for (let i = 1; i <= array.length - 1; i++) {
    let key = array[i];
    let j = i - 1;

    moves.push({ indices: [j + 1, j], type: "comp" });
    while (j >= 0 && array[j] > key) {
      moves.push({ indices: [j + 1, j], type: "swap" });
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return moves;
}
