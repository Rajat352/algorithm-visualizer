export default function selectionSort(array) {
  const swaps = [];
  for(var i = 0;i<array.length;i++){
    var min_index = i;
    for(var j = i+1; j<array.length;j++){
      if(array[j]<array[min_index]){
        min_index = j;
      }
    }
    if(min_index !== i){
      swaps.push([min_index, i]);
      [array[min_index], array[i]] = [array[i], array[min_index]];
    }
  }
  return swaps;
}