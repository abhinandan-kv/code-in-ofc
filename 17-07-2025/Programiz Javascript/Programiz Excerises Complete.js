console.log("HELLO WORLD !");

let num1 = 10,
   num2 = 100;

let a = 2,
   b = 3,
   c = 1;

let str1 = "something",
   str2 = "roaddaor";

let myObj = {
   car: "BMW",
   model: "X5",
   year: 2020,
   color: "black",
   owner: "first",
};

let people = [
   { name: "Alice", age: 25 },
   { name: "Bob", age: 20 },
   { name: "Charlie", age: 30 },
];

let year = 2024;

let myArr = ["frt", "tyu", "anger", "sadness", "pain"];
let myArr2 = ["sadness", "pain", "sadness", "pain", "sadness", "pain"];

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

   const sum = [...numStr].reduce(
      (acc, digit) => acc + Math.pow(parseInt(digit), digits),
      0
   );

   return sum === num;
}

function armstrongIntervel(num1, num2) {
   let arr = [];
   for (let i = num1; i <= num2; i++) {
      const numStr = i.toString();
      const digits = numStr.length;

      const sum = [...numStr].reduce(
         (acc, digit) => acc + Math.pow(parseInt(digit), digits),
         0
      );

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
   const values = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
   ];

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
      arr.push(
         fibonacciUsingRecursion(num - 1) + fibonacciUsingRecursion(num - 2)
      );
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
   let result = "";

   //Method 1
   //result = num.toString(2)

   //Method 2
   let divisor = 2;
   let remainder;

   while (num !== 1) {
      remainder = num % divisor; //10%2 = 0
      result += remainder.toString(); // 0=0+0
      num = Math.floor(num / divisor); // 10/2 = 5
      //console.log(num)    // 5
   }
   if (num === 1) {
      result += "1";
      result = result.split("").reverse().join("");
   }

   return result;
}

function charToAscii(num) {
   return num.toString().charCodeAt();
}

function checkPallindrome(num) {
   let reverse = "";
   num = num.toString();
   reverse = num.split("").reverse().join("");
   if (num === reverse) {
      return "Its a Pallindrome";
   } else {
      return "Its Not a Pallindrome";
   }
}

function sortAlphabetically(str) {
   //let strArr = []
   //strArr = str.split('')
   //strArr = strArr.sort()
   //console.log(strArr)
   return [str.split("").sort().join(" -> ")];
}

function replaceCharInString(str, toReplace, replaceWith) {
   let newStr = "";
   //let strArr = []
   //strArr = str.split('')      Can be done with array method too, use splice method.
   //console.log(strArr)
   str = str.toString();
   newStr = str.replaceAll(toReplace, replaceWith);
   //console.log(newStr)

   return [`Original Str : ${str} , New Str : ${newStr} `];
}

function toReverseString(str) {
   return str.split("").reverse().join("");
}

function createObjectDifferentWays() {
   //Method 1 : Creating object with a constructor
   let car1 = new objUsingConstructor("byd", 2025, "coupe");

   //Method 2 : Using object literals
   let car2 = {
      car: "GT",
      make: "2025",
      modal: "muscle",
   };

   // Method 3 : Creating object with Object.create() Method
   const car3 = {
      car: "GT line",
      make: "2025",
      modal: "sedan",
   };
   const carObject = Object.create(car3);

   // Method 4: Using es6 classes
   let car4 = new Car("GTA", 2015, "all type");

   return [car1, car2, carObject, car4];
}
function objUsingConstructor(car, make, modal) {
   this.car = car;
   this.make = make;
   this.modal = modal;
}
class Car {
   constructor(car, make, modal) {
      this.car = car;
      this.make = make;
      this.modal = modal;
   }
}

function countOccuranceInString(str, toCount) {
   let count = 0;
   let splitStr = str.split("");
   splitStr.filter((element) => {
      if (element == toCount) {
         ++count;
      }
   });
   return count;

   // Method 2
   //return str.split(toCount).length - 1;
}

function toConvertFirstCharToUpperCase(str) {
   let firstChar = str[0];
   firstChar = firstChar.toUpperCase();
   //console.log(firstChar)
   return firstChar;
}

function countVowelInString(str) {
   let count = 0;
   let strArr = str.split("");
   //console.log(strArr)
   strArr.filter((element) => {
      if (
         element == "a" ||
         element == "e" ||
         element == "i" ||
         element == "o" ||
         element == "u"
      ) {
         ++count;
         //console.log(element)
      }
   });
   return count;
}

function removePropFromObject() {
   let myObj = {
      car: "VW",
      model: 2025,
      make: "coupe",
      owner: "first",
   };
   //Method 1 : using delete method
   delete myObj.owner;
   return myObj;

   //Method 2 : using object destructing using rest operator
   // const {owner, ...newObj} = myObj
   // return newObj

   //Method 3 : using filter Method
   //let newObj = (myObj, propName) => {
   //  return Object.fromEntries(Object.entries(myObj).filter(([key]) => key !== propName));
   //};
   //return newObj(myObj,'owner')
}

function checkStartEndChar(str, toCheckFirst, toCheckLast) {
   let strLength = str.length;
   let startChar = str[0];
   let endChar = str[strLength - 1];

   //console.log(endChar)

   if (
      startChar.toLowerCase() === toCheckFirst.toLowerCase() &&
      endChar.toLowerCase() === toCheckLast.toLowerCase()
   ) {
      //console.log('if')
      return `Both start and end char are matched.`;
   } else if (
      startChar.toLowerCase() === toCheckFirst.toLowerCase() ||
      endChar.toLowerCase() === toCheckLast.toLowerCase()
   ) {
      return `Only one matched.`;
   } else {
      return `Nothing Matched !`;
   }
}

function checkKeyInObject(keyToCheck) {
   let myObj = {
      car: "VW",
      model: 2025,
      make: "coupe",
      owner: "first",
   };

   return Object.hasOwn(myObj, keyToCheck);
}

function copyObj() {
   let myObj = {
      car: "BMW",
      model: "X5",
      year: 2020,
      color: "black",
      owner: "first",
   };
   // Method 1: Using spread OP.
   //let cpyObj = { ...myObj}

   // Method 2: Using Object.assign()
   // let cpyObj;
   // cpyObj = Object.assign({},myObj)

   // Method 3: Using JSON.parse and JSON.stringify
   let cpyObj = JSON.parse(JSON.stringify(myObj));

   return cpyObj;
}

function loopInObj() {
   let myObj = {
      car: "BMW",
      model: "X5",
      year: 2020,
      color: "black",
      owner: "first",
   };

   let loopArr = [];
   // Method 1
   // for(let key in myObj){
   //     loopArr.push(key, myObj[key])
   // }

   // Method 2
   // Object.keys(myObj).forEach(key=>{
   //     loopArr.push(key,myObj[key])
   // })

   // Method 3
   for (const [key, value] of Object.entries(myObj)) {
      loopArr.push(key, value);
   }

   return loopArr;
}

function mergePropObj() {
   let myObj = {
      car: "BMW",
      model: "X5",
      year: 2020,
      color: "black",
      owner: "first",
   };
   let newObj = { ...myObj };

   return newObj;
}

function countKeyPropInObj(myObj) {
   let count = 0;
   // for(let key in myObj){
   //     ++count
   // }

   count = Object.entries(myObj).length;

   return count;
}

function addKeyValueInObj(myObj) {
   // Method 1
   //myObj.no = 1;

   //Method 2
   //myObj['no'] = 1

   // Method 3
   Object.assign(myObj, {
      no: 1,
      time: new Date().getFullYear(),
   });

   return JSON.stringify(myObj);
}

function replaceOccInStr(str, toReplace, withReplace) {
   let arr = str.split("");
   let result = str.replaceAll(toReplace, withReplace);

   return result;
}

function createMultilineStr() {
   let result =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum is simply dummy text of the printing and typesetting industry.\n ";

   return result;
}

function strToCurrencyFormat(num) {
   let currency;
   currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(num);

   return currency;
}

function generateRandomStr() {
   let randomStr;
   randomStr = Math.random().toString(36).substring(2, 10);

   return randomStr;
}

function checkInitialStr(str1, str2) {
   if (str1.startsWith(str2) || str2.startsWith(str1)) {
      return true;
   }
   return false;
}

function trimStr(str) {
   return str.trim();
}

function objToStr(obj) {
   return JSON.stringify(obj);
   // return obj.toString() // will give object Object output
}

function checkSubstringExists(str1, str2) {
   let result = str1.includes(str2);

   return result;
}

function compareTwoString(str1, str2) {
   let result;

   // Method 1
   // if(str1.toLowerCase() === str2.toLowerCase()){
   //   result = true
   // }else{
   //   result = false
   // }

   // Method 2
   result = str1.localeCompare(str2);

   return result;
}

function encodeBase64(str) {
   return btoa(str);
}

function replaceAllStr(str) {
   let newStr;
   newStr = str.toLowerCase().replaceAll("s", "$");

   return newStr;
}

function breaksWithNewLine(str) {
   return str.split(" ").join("<br>");
}

function currDate() {
   let date = new Date();
   return date;
}

function checkLeapYear(year) {
   // Method 1
   // if(year % 4 === 0 || year % 100 === 0 || year %400 === 0){
   //   return true
   // }
   // return false

   // Method 2
   let date = new Date(year, 2, 0);
   let febMonth = date.getDate();

   //console.log(febMonth);

   if (febMonth === 29) {
      return true;
   }

   return false;
}

function formatDate() {
   let date = new Date().toDateString();
   return date;
}

function currentDate() {
   return new Date().getDate();
}

function compareTwoDates() {
   let date1 = new Date();
   let date2 = new Date();

   if (date1 == date2) {
      return true;
   }
   return false;
}

//66
// function countdown() {
//    const targetDate = new Date("2025-12-31T23:59:59");
//    let result;
//    const countdown = setInterval(() => {
//       const now = new Date();
//       const diff = targetDate - now;

//       if (diff <= 0) {
//          clearInterval(countdown);
//          //console.log("Countdown finished!");
//          return
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((diff / (1000 * 60)) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       result = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
//       return result;
//    }, 1000);
// }

function removeItemFromArray(arr, value) {
   let index = arr.indexOf(value);
   // console.log(index)
   return arr.splice(index, 1);
}

function checkArrayContainValue(arr, value) {
   let result;
   // method 1
   arr.filter((ele) => {
      if (ele == value) {
         result = ele;
      } else {
         result = `Not found : value = ${value}`;
      }
      //console.log(ele)
   });
   //console.log(result)

   // method 2
   //result = arr.includes(value)

   return result;
}

function addItemToArray(arr, value) {
   arr.push(value);
   return arr;
}

function appendObjToArray(arr, obj) {
   arr.push(obj);
   let parsedArr = JSON.stringify(arr);
   return parsedArr;
}

function toEmptyAnArray(arr) {
   //method 1
   // arr.length = 0

   // Method 2
   arr.splice(0, arr.length);

   return arr.length;
}

function addItemAtStartArray(arr, value) {
   arr.unshift(value);
   console.log(arr);
   return arr;
}

function removeDupsFromArray(arr) {
   let result = arr.reduce((accu, curr) => {
      if (!accu.includes(curr)) {
         accu.push(curr);
      }
      return accu;
   }, []);
   return result;
}

function sortByAge(arr) {
   return arr.sort((a, b) => a.age - b.age);
}

function create2DArray(rows, cols, initialValue = 0) {
   return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}

function extractProperty(arr, key) {
   return arr.map((obj) => obj[key]);
}

function compareArrays(arr1, arr2) {
   return (
      arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i])
   );
}

function getRandomItem(arr) {
   const index = Math.floor(Math.random() * arr.length);
   return arr[index];
}

function arrayIntersection(arr1, arr2) {
   return arr1.filter((item) => arr2.includes(item));
}

function chunkArray(arr, size) {
   const chunks = [];
   for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
   }
   return chunks;
}

// 83

function getFileExtension(filename) {
   return filename.split(".").pop();
}

function isUndefinedOrNull(value) {
   return value === undefined || value === null;
}

function greetUser(name = "Guest") {
   return `Hello, ${name}!`;
}

function setOperations(a, b) {
   const setA = new Set(a);
   const setB = new Set(b);

   const union = [...new Set([...a, ...b])];
   const intersection = a.filter((x) => setB.has(x));
   const difference = a.filter((x) => !setB.has(x));

   return { union, intersection, difference };
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function getCurrentURL() {
//   return window.location.href;
// }

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isFunction(input) {
  return typeof input === "function";
}


function demoConstant() {
  const PI = 3.14159;
  return `The value of PI is ${PI}`;
}

function delayedMessage(name) {
  setTimeout(() => {
    console.log(`(Delayed) Hello, ${name}!`);
  }, 1000);
  return `setTimeout scheduled for ${name}`;
}

function generateRange(start, end) {
  const result = [];
  const isChar = isNaN(start);

  if (isChar) {
    for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
      result.push(String.fromCharCode(i));
    }
  } else {
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  }

  return `Generated Range: [${result.join(", ")}]`;
}



function greet(name, age) {
  return age !== undefined
    ? `Hello ${name}, you are ${age} years old`
    : `Hello ${name}`;
}


function createStack() {
  const stack = [];
  stack.push(10);
  stack.push(20);
  stack.pop();
  return `Stack after operations: [${stack.join(", ")}]`;
}


function createQueue() {
  const queue = [];
  queue.push(1);
  queue.push(2);
  queue.shift();
  return `Queue after operations: [${queue.join(", ")}]`;
}

function checkNumberType(num) {
  return Number.isInteger(num)
    ? `${num} is an Integer`
    : `${num} is a Float`;
}


function executeCallback(cb) {
  const result = cb("Jonathan");
  return `Callback says: ${result}`;
}

function greet(name) {
  return `Hello, ${name}`;
}

// function getImageDimensions(img) {
//   return `Width: ${img.width}, Height: ${img.height}`;
// }

// 101 repeated 

function writeMessage(message) {
  return `Console Output: ${message}`;
}

function dateToNumber(date) {
  return `Timestamp: ${+new Date(date)}`;
}

console.log("Triangle Area :", triangleArea(num1, num2));

console.log(`Swapped Number : ${swapTwoNumbers(num1, num2)}`);

console.log(`Quadratic Equation : ${quadraticEquation(a, b, c)}`);

console.log(`KM to Miles : ${kmToMiles(num2)} Miles`);

console.log(`Celsius to Fahrenheit : ${celsiusToFahrenheit(num1)}F`);

console.log(`Random Number generator 1 to 100 : ${generateNewNumber()}`);

console.log(
   `Check if Number is Positive , Negeative Or Zero : ${checkNumPosNegZero(
      num1
   )}`
);

console.log(`Check if Number is Odd or Even : ${checkNumOddOrEven(num1)}`);

console.log(`Check the Largest of three is : ${checkLargestOfThree(a, b, c)}`);

console.log(`Check the Number Prime Or Not : ${checkPrimeNumber(num1)}`);

console.log(
   `Print all the prime number between intervel are : ${printAllPrimes(
      num1,
      num2
   )}`
);

console.log(`Find the factorial numbers : ${findFactorial(num1)}`);

// this code is hidden because of long output
// console.log(`Display Multiplication Table : ${displayMultiplicationTable(num1)}`);

console.log(`Print all Fibonacci Sequence : ${fibonacciSequence(num1)}`);

console.log(`Check if Number is Armstrong or Not : ${armstrongNum(num2)}`);

console.log(
   `Print all armstrong number in an intervel : ${armstrongIntervel(
      num1,
      1000
   )}`
);
//console.log(`Mini calculator : `);

console.log(`Sum of all N Natural Number : ${sumOfNNaturalNo(num2)}`);

console.log(
   `Check if number have same last digit : ${checkSameLastDigit(num1, num2)}`
);

console.log(`Print HCF of two Numbers : ${findHcf(num1, num2)}`);

console.log(`Print LCM of two Numbers ; ${findLcm(num1, num2)}`);

console.log(`Print Factors of the numbers : ${findFactors(num1)}`);

console.log(
   `Print all Natural number using Recursion : ${findSumOfNaturalNumberRecursion(
      num1
   )}`
);

//console.log(`Guess random number (but code wont work in editor need node support or run in browser) : ${guessRandomNumber()}`)

console.log(`Shuffle the deck of cards : ${shuffleDeckCards()}`);

console.log(
   `Find Fibonacci Number using recursion : ${findSumOfNaturalNumberRecursion(
      num1
   )}`
);

console.log(
   `Find Factorial using recusion : ${factorialNumberUsingRecursion(num1)}`
);

console.log(`Decimal to Binary conversion : ${decimalToBinary(num1)}`);

console.log(`Char to ASCII code is : ${charToAscii(num1)}`);

console.log(`Check if Pallindrom or Not : ${checkPallindrome(num2)}`);

console.log(`Sort words in alphabetical order : ${sortAlphabetically(str1)}`);

console.log(`Replace char in String : ${replaceCharInString(str1, "o", "#")}`);

console.log(`Reversed a string : ${toReverseString(str1)}`);

console.log(
   `Object Created using different Ways : ${createObjectDifferentWays()}`
);

console.log(
   `Count a char Occurance in String : ${countOccuranceInString(str1, "i")}`
);

console.log(
   `Convert the first letter to Uppercase : ${toConvertFirstCharToUpperCase(
      str1
   )}`
);

console.log(`Count number of Vowels in String : ${countVowelInString(str1)}`);

console.log(`To remove a property from the object : ${removePropFromObject()}`);

console.log(
   `To check first and end with certain character : ${checkStartEndChar(
      str1,
      "S",
      "G"
   )}`
);

console.log(
   `To check if key exist in Object or Not : ${checkKeyInObject("owner")}`
);

console.log(`Print Cloned Object : ${JSON.stringify(copyObj())}`);

console.log(`Loop through Object : ${loopInObj()}`);

console.log(`Merge Property of two Object : ${mergePropObj()}`);

console.log(`Count Key and values in Object : ${countKeyPropInObj(myObj)}`);

console.log(`Add new key/value in Object : ${addKeyValueInObj(myObj)}`);

console.log(
   `Replace all Occurance in String : ${replaceOccInStr("abcdea", "a", "$")} `
);

console.log(`Multiline String : ${createMultilineStr()}`);

console.log(
   `Format String to a Currency String : ${strToCurrencyFormat("100")}`
);

console.log(`Generate Random String : ${generateRandomStr()}`);

console.log(
   `Check if two string starts are same : ${checkInitialStr(str1, str2)}`
);

console.log(`Trimed String : ${trimStr("  spaced text    ")}`);

console.log(`Convert object to string : ${objToStr(myObj)}`);

console.log(
   `Check substring exists in string : ${checkSubstringExists(str1, str2)}`
);

console.log(`Compare two Strings : ${compareTwoString(str1, str2)}`);

console.log(`Encoding to base64 : ${encodeBase64(str1)}`);

console.log(`Replace all string char with something : ${replaceAllStr(str1)}`);

console.log(
   `Replace space with br tag : ${breaksWithNewLine(
      "some random text is here thankss"
   )}`
);

console.log(`Current Date Time : ${currDate()}`);

console.log(`Check Leap Year : ${checkLeapYear(year)}`);

console.log(`Formated Date : ${formatDate()}`);

console.log(`Today Date is : ${currentDate()}`);

console.log(`Compare two Dates : ${compareTwoDates()}`);

// console.log(`Countdown result : ${countdown()}`);

console.log(
   `Remove Specific item from the array : ${removeItemFromArray(myArr, "pain")}`
);

console.log(
   `Check Array contain specific value : ${checkArrayContainValue(
      myArr,
      "friend"
   )}`
);

console.log(`Add item to the array : ${addItemToArray(myArr, "cars")}`);

console.log(`Append Object to Array : ${appendObjToArray(myArr, myObj)}`);

console.log(`Empty the array : ${toEmptyAnArray(myArr)}`);

console.log(
   `Add item at start of the array : ${addItemAtStartArray(myArr2, "valuable")}`
);

console.log(
   `Remove Duplicates from the array : ${removeDupsFromArray(myArr2)}`
);

console.log("Sorted by Age:", sortByAge(people));

console.log("2D Array:", create2DArray(3, 4));

console.log("Extracted Names:", extractProperty(people, "name"));

console.log("Arrays Equal:", compareArrays([1, 2, 3], [1, 2, 3]));

console.log("Random Item:", getRandomItem(myArr2));
4;

console.log("Intersection:", arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]));

console.log("Chunked Array:", chunkArray([1, 2, 3, 4, 5, 6, 7], 3));

console.log(`File Extension: ${getFileExtension("script.js")}`);

console.log(`Is undefined or null: ${isUndefinedOrNull(null)}`);

console.log(`Greeting: ${greetUser()}`);

console.log("Set Operations:", setOperations([1, 2, 3], [2, 3, 4]));

console.log(`Random number between 10 and 20: ${randomBetween(10, 20)}`);

// console.log(`Current URL: ${getCurrentURL()}`);

console.log(`Valid email: ${isValidEmail("test@example.com")}`);

console.log(`Is Function: ${isFunction(() => {})}`);

console.log(`Constrants demo : ${demoConstant()}`);

console.log(`Result: ${delayedMessage("Anonymous")}`);


console.log(`Two function calling : ${generateRange(1, 5)} ${generateRange("a", "d")}`);


console.log(`Greet 1: ${greet("Hacker")}`);

console.log(`Greet 2: ${greet("Ted", '∞')}`);


console.log(`${createStack()}`);

console.log(`${createQueue()}`);

console.log(`${checkNumberType(5)} , ${checkNumberType(3.14)}`);

console.log(`${executeCallback(greet)}`);

console.log(`${writeMessage("JavaScript is awesome!")}`);

console.log(`${dateToNumber("2025-12-31")}`);