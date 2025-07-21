let twoD_matrix = [
  [1, 2, 3],
  [8, 9, 4],
  [7, 6, 5],
];


function spiralOrder(twoD_matrix) {
  let row = twoD_matrix.length;
  let col = twoD_matrix[0].length;

  let left = 0;
  let right = col - 1;
  let top = 0;
  let bottom = row - 1;

  let resultArr = [];

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      resultArr.push(twoD_matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      resultArr.push(twoD_matrix[i][right]);
    }
    right--;

    if (left <= right) {
      for (let i = right; i >= left; i--) {
        resultArr.push(twoD_matrix[bottom][i]);
      }
      bottom--;
    }
    if (top <= bottom) {
      for (let i = bottom; i >= top; i--) {
        resultArr.push(twoD_matrix[i][left]);
      }
      left++;
    }
  }
  return resultArr;
}

console.log(spiralOrder(twoD_matrix));
