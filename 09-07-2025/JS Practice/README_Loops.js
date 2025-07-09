//              LOOOOOOOOPS

// for loop

for (let i = 1; i <= 10; i++) {
  for (let j = 0; j < i; j++) {
    console.log("*");
  }
  console.log("\n");
}

// for in
// const myObj = {
//   car1: { id: 1, value: "Something is here" },
//   car2: { id: 2, value: "Something is here 2" },
// };

// for (let key in myObj){
//     console.log(key, ":" , myObj[key], ":", myObj[key].value)
// }


// for of
// const myArr = [
//     [1,2,3,4,5],
//     ["a","b","c","d","e"]
// ]
// for(let ele of myArr){
//     console.log(ele)
// }


// while
// const limit = 5
// let start = 0
// while(start<=limit){
//     console.log("Inside While Loop, with value :", start)
//     start++;
// }


// do-while
// const limit = 5
// let start = 0
// do{
//     console.log("Inside do")
// }while(start===limit);





// forEach
// const myArr=[
//     ["a","b","c","d","e"],
//     [1,2,3,4,5]
// ]
// const cpyArr=[]
// myArr.forEach(element => {
//     console.log(element)
//     cpyArr.push(element)
// });

// console.log("Copy Array : " , cpyArr)














// for await...of

// async function* myFun(){
//     yield 10;
// }
// (async ()=>{
//     for await (const element of myFun()) {
//         console.log(element)
//     }
// })()