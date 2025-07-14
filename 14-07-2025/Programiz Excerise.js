console.log("HELLO WORLD !");

let num1 = 10,
  num2 = 100;

let a = 2,
  b = 3,
  c = 1;

console.log("Add :", num1 + num2);

console.log("Square Root :", Math.sqrt(num2));

function triangleArea(base, height) {
  return 0.5 * base * height;
}

function swapTwoNumbers(num1, num2) {
  let swap = ([num1, num2] = [num2, num1]);
  return swap;
}

function quadraticEquation(a, b, c) {
  let numeratorPositive = -b + Math.sqrt(b ** 2 - 4 * a * c);
  let numeratorNegative = -b - Math.sqrt(b ** 2 - 4 * a * c);

  let denominator = 2 * a;

  let xPositive = numeratorPositive / denominator;
  let xNegative = numeratorNegative / denominator;

  return [xPositive, xNegative];
}

function kmToMiles(km) {
  return km * 0.621371;
}

function celsiusToFahrenheit(cel) {
  return (cel * 9) / 5 + 32;
}

function generateNewNumber() {
  let random = Math.random() * 100;
  let roundedRandom = Math.floor(random);
  return roundedRandom;
}

function checkNumPosNegZero(num1) {
  if (num1 > 0) {
    return "Positive";
  } else if (num1 < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

function checkNumOddOrEven(num1) {
  if (num1 % 2 == 0) {
    return "Its Even";
  } else {
    return "Its Odd";
  }
}

function checkLargestOfThree(a, b, c) {
  if (a > b && a > c) {
    return a;
  } else if (b > a && b > c) {
    return b;
  } else {
    return c;
  }
}

function checkPrimeNumber(num1) {
  if (num1 <= 1) {
    return "Its Not a Prime";
  }
  for (let i = 2; i < num1; i++) {
    if (num1 % i === 0) {
      return "Its Not a Prime";
    }
    return "Its Prime";
  }
}

function printAllPrimes(intervel1, intervel2) {
  let totalPrimeArr = [];
  if (intervel1 <= 2) {
    intervel1 = 2;
    if (intervel2 >= 2) {
      console.log(intervel1);
      intervel1++;
    }
  }
  if (intervel1 % 2 == 0) {
    intervel1++;
  }
  for (let i = intervel1; i <= intervel2; i = i + 2) {
    let flag = 1;
    for (let j = 2; j * j <= i; ++j) {
      if (i % j == 0) {
        flag = 0;
        break;
      }
    }
    if (flag == 1) {
      if (i == 1) continue;
      else totalPrimeArr.push(i);
    }
  }
  return totalPrimeArr;
}

function findFactorial(num1) {
  let total = 1;
  for (let i = num1; i >= 2; i--) {
    total = i * total;
    //console.log(i)
  }
  return total;
}

function displayMultiplicationTable(limit) {
  let arr = [];
  for (let i = 1; i <= limit; i++) {
    for (let j = 1; j <= 10; j++) {
      let total = 0;
      total = i * j;
      arr.push(`${i} X ${j} = ${total} \n`);
    }
  }
  return arr;
}

function fibonacciSequence(num) {
  let num1 = 0;
  let num2 = 1;
  let sum;
  let arr = [];
  if (num === 1) {
    arr.push(num1);
  } else if (num === 2) {
    arr.push(num2);
  } else {
    for (let i = 3; i <= num; i++) {
      sum = num1 + num2;
      num1 = num2;
      num2 = sum;
      arr.push(num1);
    }
    arr.push(num2);
  }
  return arr;
}

function armstrongNum(num) {
  const numStr = num.toString();
  const digits = numStr.length;

  const sum = [...numStr].reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits), 0);

  return sum === num;
}

function armstrongIntervel(num1, num2) {
  let arr = [];
  for (let i = num1; i <= num2; i++) {
    const numStr = i.toString();
    const digits = numStr.length;

    const sum = [...numStr].reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits), 0);

    if (sum === i) {
      arr.push(sum);
    }
  }
  return arr;
}

// function simpleCalc(operator, num1, num2) {
//   let operatorSpn = document.querySelectorAll("button");
//   let op;
//   let input1 = document.getElementById('num1')
//   let input2 = document.getElementById('num2')

// }

// function sendOp(oper) {
//   console.log(oper);
//   simpleCalc(oper)
// }

function sumOfNNaturalNo(num) {
  return (num * (num + 1)) / 2;
}

function checkSameLastDigit(num1, num2) {
  const lastDigit1 = num1 % 10;
  const lastDigit2 = num2 % 10;
  return lastDigit1 === lastDigit2;
}

function findHcf(num1, num2) {
  while (num1 !== num2) {
    if (num1 > num2) {
      num1 -= num2;
    } else {
      num2 -= num1;
    }
  }
  return num1;
}

function findLcm(num1, num2) {
  let hcf = findHcf(num1, num2);
  let lcm = (a * b) / hcf;

  return lcm;
}

function findFactors(num) {
  let arr = [];

  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      arr.push(i);
    }
  }
  return arr;
}

function findSumOfNaturalNumberRecursion(num) {
  if (num > 0) {
    return num + findSumOfNaturalNumberRecursion(num - 1);
  } else {
    return num;
  }
}

// function guessRandomNumber(){
//     let input = prompt("something here and run it in browser, enter your guessed number between 1 to 100")
//     let random = Math.floor(Math.random()*100)
//     if(random == input){
//         return true
//     }else{
//         return false
//     }
// }

function shuffleDeckCards() {
  const suits = ["Spades", "Diamonds", "Club", "Heart"];
  const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

  let suitRandom = Math.floor(Math.random() * suits.length);
  let valuesRandom = Math.floor(Math.random() * values.length);
  //console.log(suitRandom,valuesRandom)

  return [values[valuesRandom], "Of", suits[suitRandom]];
}

function fibonacciUsingRecursion(num) {
  let arr = [];
  if (num < 2) {
    arr.push(num);
  } else {
    arr.push(fibonacciUsingRecursion(num - 1) + fibonacciUsingRecursion(num - 2));
  }
  return arr;
}

function factorialNumberUsingRecursion(num) {
  if (num == 0) {
    return 1;
  } else {
    let total = 1;

    return num * factorialNumberUsingRecursion(num - 1);
  }
}

function decimalToBinary(num) {
  let result;
  result = num.toString(2)

  // let str = "";
  // while (num != 0) {
  //   if (num == 1) {
  //     num = 0;
  //   } else {
  //     let rem = num % 2;
  //       str += rem.toString();
  //       num = rem
  //       console.log(str)
  //   }
  // }
  // return str;
  return result;
}

console.log("Triangle Area :", triangleArea(num1, num2));

console.log(`Swapped Number : ${swapTwoNumbers(num1, num2)}`);

console.log(`Quadratic Equation : ${quadraticEquation(a, b, c)}`);

console.log(`KM to Miles : ${kmToMiles(num2)} Miles`);

console.log(`Celsius to Fahrenheit : ${celsiusToFahrenheit(num1)}F`);

console.log(`Random Number generator 1 to 100 : ${generateNewNumber()}`);

console.log(`Check if Number is Positive , Negeative Or Zero : ${checkNumPosNegZero(num1)}`);

console.log(`Check if Number is Odd or Even : ${checkNumOddOrEven(num1)}`);

console.log(`Check the Largest of three is : ${checkLargestOfThree(a, b, c)}`);

console.log(`Check the Number Prime Or Not : ${checkPrimeNumber(num1)}`);

console.log(`Print all the prime number between intervel are : ${printAllPrimes(num1, num2)}`);

console.log(`Find the factorial numbers : ${findFactorial(num1)}`);

// this code is hidden because of long output
// console.log(`Display Multiplication Table : ${displayMultiplicationTable(num1)}`);

console.log(`Print all Fibonacci Sequence : ${fibonacciSequence(num1)}`);

console.log(`Check if Number is Armstrong or Not : ${armstrongNum(num2)}`);

console.log(`Print all armstrong number in an intervel : ${armstrongIntervel(num1, 1000)}`);
//console.log(`Mini calculator : `);

console.log(`Sum of all N Natural Number : ${sumOfNNaturalNo(num2)}`);

console.log(`Check if number have same last digit : ${checkSameLastDigit(num1, num2)}`);

console.log(`Print HCF of two Numbers : ${findHcf(num1, num2)}`);

console.log(`Print LCM of two Numbers ; ${findLcm(num1, num2)}`);

console.log(`Print Factors of the numbers : ${findFactors(num1)}`);

console.log(`Print all Natural number using Recursion : ${findSumOfNaturalNumberRecursion(num1)}`);

//console.log(`Guess random number (but code wont work in editor need node support or run in browser) : ${guessRandomNumber()}`)

console.log(`Shuffle the deck of cards : ${shuffleDeckCards()}`);

console.log(`Find Fibonacci Number using recursion : ${findSumOfNaturalNumberRecursion(num1)}`);

console.log(`Find Factorial using recusion : ${factorialNumberUsingRecursion(num1)}`);

console.log(`Decimal to Binary conversion : ${decimalToBinary(num1)}`);
