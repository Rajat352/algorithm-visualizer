export default function selectionSort(array) {
  const moves = [];
  for (var i = 0; i < array.length; i++) {
    var min_index = i;
    for (var j = i + 1; j < array.length; j++) {
      moves.push({ indices: [min_index, i], type: "comp" });
      if (array[j] < array[min_index]) {
        min_index = j;
      }
    }
    if (min_index !== i) {
      moves.push({ indices: [i, min_index], type: "swap" });
      [array[i], array[min_index]] = [array[min_index], array[i]];
    }
  }
  return moves;
}
