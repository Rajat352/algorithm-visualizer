export default function bubbleSort(array) {
  const moves = [];
  const pseudoCode = `
begin BubbleSort(list)

  for all elements of list
      if list[i] > list[i+1]
        swap(list[i], list[i+1])
      end if
  end for
    
    return list
end BubbleSort`;
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return [moves, pseudoCode];
}
