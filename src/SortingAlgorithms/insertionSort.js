export default function insertionSort(array) {
  const moves = [];
  const pseudoCode = `
procedure insertionSort(arr):
  for i = 1 to n-1
      key = arr[i]
      j = i-1
      while j >= 0 and arr[j] > key
          swap arr[j+1] with arr[j]
          j = j - 1
      end while
  end for
end function`;
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
  return [moves, pseudoCode];
}
