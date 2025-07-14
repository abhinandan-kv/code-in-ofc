// Merging 2 arrays, removing duplicates, sorting using built-in & bubbleSort

// let arr = [1, 2, 3, 4, 5, 3, 2, 5, 7, 1, 6, 3, 1, 10, 11, 2, 3];
// let arr2 = [1, 12, 3, 51, 2, 3, 4, 5, 3, 2, 5, 7, 1, 6, 3, 1, 10, 11, 2, 3];

// let merged = [...arr, ...arr2];
// console.log(merged);

// let removeDups = [];
// for (let i of merged) {
//   if (!removeDups.includes(i)) {
//     removeDups.push(i);
//   }
// }
// console.log(removeDups);

// let Sort1 = removeDups.sort((a, b) => b - a);
// console.log("Inbuilt sort",Sort1);

// let Sort2 = (removeDups) => {
//   let isSorted = false;
//   while (!isSorted) {
//     isSorted = true;
//     for (let i = 0; i < removeDups.length - 1; i++) {
//       if (removeDups[i] > removeDups[i + 1]) {
//         [removeDups[i], removeDups[i + 1]] = [removeDups[i + 1], removeDups[i]];

//         isSorted = false;
//       }
//     }
//   }
//       return removeDups;

// };

// console.log("Bubble Sort",removeDups);


// Pyramid print

// for (let i = 0; i <= 5; i++) {
//   let count = 1;
//   let str = " ";
//   for (let j = 0; j <= 2 * 5; ++j) {
//     if (i + j >= 5 + 1 && i >= j - 5 + 1) {
//       str += "+";
//       count++;
//     } else {
//       str += " ";
//     }
//   }
//   console.log(str);
// }


