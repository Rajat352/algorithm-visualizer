export default function bubbleSort(array) {
  const swaps=[];
  do{
    var swapped = false;
    for(let i =0; i<array.length; i++){
      if(array[i]>array[i+1]){
        swapped = true;
        swaps.push([i,i+1]);
        [array[i], array[i+1]] = [array[i+1], array[i]]
      }
    }
  }while(swapped)
  return swaps;
}