

// task 1  Closures + Functions + Hoisting

function counter (value){
    let number =0 ;
    
    return {
    increment: function() {
      number += 1;
      return number;
    },
    reset: function() {
      number = 0;
      return number;
    },
    get: function() {
      return number;
    }
  };
    
}
 
const counterVar = counter();
console.log(counterVar.increment());
console.log(counterVar.get())
console.log(counterVar.increment());
console.log(counterVar.reset())


// task 2 Sync vs Async + Promises + async/await
const userId = 123;

async function fetchUserDataAwait(userId){
    await setTimeout(()=>{
        console.log(userId)
    },2000)
}

fetchUserDataAwait(userId)


function fetchUserDataPromise(userId){
    new Promise((res, rej)=>{
        setTimeout(()=>{
            console.log(userId)
        },2000)
    })
}

fetchUserDataPromise(userId)




// // task 3- String & Array Methods - INCOMPLETE

// let word = "Hello World"
// let result ; 

// function strReverse(str){
//     for(let i=str.length; i>=0 ; i--){
//         if(i == undefined || i == ' '){
//             i += ' '
//         }else{
//         console.log("inside strReverse",str[i])
//         result += str[i]
//         console.log(`result ${result}`)
//         }
//     }
//     return result
// }
// function reverseStr(str){
//     let strArr = []
//     let resultArr = []
    
//     strArr = str.split(' ')
    
//     console.log("string split ",strArr)
    
//     for(let val of strArr){
//         if(val == undefined){
//             result+=' '
//         }
//         //resultArr = val.reverse()
//         //console.log(val)
//         strReverse(val)
//         console.log("result ",result)
//     }
//     //result = resultArr.join('')
//     //console.log(result)
    
// }

// reverseStr(word)

// task 3- String & Array Methods

let word = "Hello World"
let result ; 

function reverseStr(word){
    let wordArr = word.split(' ')
    console.log(wordArr)
    let wordArrRev = [];
    wordArr.forEach(element => {
        strReverse(element);
        wordArrRev.push(strReverse(element));
    });
    console.log(wordArrRev)
    console.log('wordArr', wordArr)
}

reverseStr(word)

function strReverse(str){
    let revStr = '';
    for(let i = str.length-1; i>=0; i--){
        revStr += str[i];
    }
    return revStr;
}





// task 4 - String & Array Methods -Given an array
let arr = [1,2,3,4,5]

console.log(arr.splice(2,1))
console.log(arr.push(6))
let doubleArr = []
for(let val of arr){
    let db = val*2
    doubleArr.push(db)
}
console.log(doubleArr)

let sum = doubleArr.reduce((accu, curr)=>{
    let sum = accu ;
    sum += curr;
    //console.log(accu,curr)
    return sum
})
console.log(sum)






// task 5 - Loops + Date Functions

let date = new Date()
//console.log(date)

let day = date.getDay()
//console.log(day)

let dateNum = date.getDate()
//console.log("date",dateNum)

let sevenDate = dateNum + 7;

let dayArr = ['monday','tuesday','wednesday','thrusday','friday','saturday','sunday']


for(let i=dateNum; i<sevenDate ; i++){
    let resultDay ;
    resultDay = i % 7
    console.log("DATE :- ",i,dayArr[resultDay])
}





// task 6 - Promises with Real Life Scenario 

function printData(){
    new Promise((res, rej)=>{
        setTimeout(()=>{
            console.log('Loggin in')
        },1000)
    }).then(
        setTimeout(()=>{
            console.log('Fetching Profile...')
        },2000)
        )
        .then(setTimeout(()=>{
            console.log('Fetching Orders...')
        },3000)
        )
        .then(setTimeout(()=>{
            console.log('All done!')
        },4000))
            
}

// printData()

async function printData(){
    await setTimeout(()=>{
        console.log('Loggin in')
        },1000)
        
    await setTimeout(()=>{
        console.log('Fetching Profile...')
        },2000)
        
    await setTimeout(()=>{
        console.log('Fetching Orders...')
        },3000)
        
    await setTimeout(()=>{
        console.log('All done!')
        },4000)
}

printData()







// task 7 - Type Conversion Challenge

const age = '25'
const isStudent = 'false'
const price = '123.45'

let newAge = parseInt(age)

console.log(newAge)
console.log(typeof(newAge))

let newStudent = Boolean(isStudent)
console.log("type of student ",typeof(newStudent))

let newPrice = parseFloat(price)
console.log("tpye of price" , typeof(newPrice), newPrice)

if(typeof(newAge) == 'number' && typeof(newStudent) == 'boolean' && typeof(newPrice) === 'number'){
    console.log('Validation Done')
}











// // task 8 - FizzBuzz with a Twist

function fizzBuzz(){
    for(let i = 1 ; i<=50 ; i++){
        if(i % 3 == 0 && i % 5 == 0){
            console.log('FizzBuzz')
        }else if(i % 3 == 0){
            console.log('Fizz')
        }else if(i % 5 == 0){
            console.log('Buzz')
        }
        else if(prime(i)){
            console.log(`${i}*`)
            
        }
    }
}

function prime(num) {
  if (num <= 1) {
    return false;
  }


  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

fizzBuzz()


// task 9 - Anagram Checker

function anagram(str1, str2){
    if(str1.length != str2.length){
        console.log('not an anagram')
    }else{
    let str1Arr = [], str2Arr = [];
    
    str1Arr = str1.split('')
    console.log(str1Arr)
    str2Arr = str2.split('')
    console.log(str2Arr)
    
    let flag ;
    
    for(let val of str1Arr){
        if(!str2Arr.includes(val)){
            flag = 1
            
        }
        //console.log(val)
    }
    if(flag == 1){
        console.log('not a anagram')
    }else{
        console.log('its a anagram')
    }
    }
}

anagram('listen','silent')




// task 11 - Remove Duplicate Characters
const input = 'programming'

let inputArr = []
let resultArr = []


inputArr = input.split('')

//console.log(inputArr)

let flag ;

for(let val of inputArr){
    if(!resultArr.includes(val)){
        resultArr.push(val)
        //console.log(val)
    }
}

//console.log("result", resultArr)

resultArr = resultArr.join('')
let resultStr = resultArr.toString()

console.log(resultStr)






// task 12 - Sorting by Custom Logic 

// let inputArr = ["hello", "hi", "world", "aeiou"];

// function vowelCounter(str) {
//     let vCount = 0;
//     for (let i = 0; i < str.length; i++) {
//         if ('aeiou'.includes(str[i].toLowerCase())) {
//             vCount++;
//         }
//     }
//     return vCount;
// }

// let result = inputArr.sort((a, b) => vowelCounter(b) - vowelCounter(a));
// console.log(result);























// task 13 - Flatten Nested Array Without .flat()
const arr = [1,[2,[3,[4]],5]]

//console.log(arr.flat(5))
//let newArr = []


//console.log(newArr)

function array(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? array(val) : val);
  }, []);
}

console.log(array(arr))





// task 14  Sum of Digits Until One Digit

let num = 9875;

function digitSum(num){
    let result=0;
    let size = num.toString()
    size = size.length
    num = num.toString()
    console.log("type of num", typeof(num), num)
    
    //console.log("Num size",size)
    
    while(size != 1){
        result = 0
        size  = parseInt(size)
        let strNum = 0
        for(let i = 0 ; i<size ; i++){
            strNum = parseInt(num[i])
            console.log("type of strNum",typeof(strNum), strNum)
            result += strNum
            console.log("type of result", typeof(result))
            console.log("Result" , result)
            console.log('=================================')
        }
        num = result;                                   //29
        console.log(num)
        console.log("TYPE OF NUM : ", typeof(num), num)
        size = num.toString()                            //string 29
        console.log("SIZE Type ",typeof(size), size)
        size = size.length                              // 2
        console.log("Num size",size)
        num = num.toString()
        console.log("TYPE OF NUM : ", typeof(num), num)
    }
    
    console.log("Result : ", num)
    
}

digitSum(num)




// 1 Incomplete




































