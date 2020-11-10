// // Input: var oneDarr = [1, 2, 3, 4, 5, 6]
// //for size - 3: 
// // Output[[1, 2, 3], [4, 5, 6]]
// const arr = [1, 2, 3, 4, 5, 6];
// const size = 8;
// let finalArray = [];
// let tempArray = [];
// let j = 1;
// if (arr.length < size) {
//     finalArray = arr;
// } else {
//     for (let i = 0; i < arr.length + 1; i++) {
//         if (j <= size) {
//             j++;
//             tempArray.push(arr[i]);
//         } else {
//             finalArray.push(tempArray);
//             j = 1;
//             i--;
//             tempArray = [];

//         }
//     }
// }
// console.log(finalArray);

const str = "googlemeetdasdasllllz"
let leastOccuredCharCount = 1000;
let leastOccuredChar = str[0];
for (let i = 0; i < str.length; i++) {
    let occurredCount = 0;
    for (let j = 0; j < str.length; j++) {
        if (str[i] === str[j]) {
            occurredCount++;
        }
    }
    if (occurredCount < leastOccuredCharCount) {
        leastOccuredCharCount = occurredCount;
        leastOccuredChar = str[i];
    }
}
console.log(leastOccuredChar);