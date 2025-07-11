//              ARRAY ITERATION METHODS
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// forEach - takes 3 arguments max ie. itemValue, itemIndex, arrayItself
// const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log("Basic demostration  directly");

// arr1.forEach((ele) => {
//   console.log(ele);
// });


// console.log("Bit advanced demostration");

// arr1.forEach(forEachDemoFn);

// function forEachDemoFn(element, index, arr) {
//   console.log("val :", element, "index :", index, "array :", arr);
// }


// for Method
// const arr1 = [1,2,3,4,5,6,7,8,9];
// for(let i=0 ; i<arr1.length ; i++){
//     console.log("value :-",arr1[i])
// }


// .map Method
// const arr1 = [1,2,3,4,5,6,7,8,9];
// let result = arr1.map(forMapFn)

// function forMapFn(value, index, arr){
//     console.log("value :", value, "index :", index, "arr :", arr)
//     let ending = "This is the value :-" + value;
//     console.log(ending)
//     return ending;         // <- By default the map doesnot return anything so if you want to save the operations you need to return it, else it will be undefined.
// }
// console.log("Type of Result is :-",typeof(result))
// console.log("Orginial arr1 :-", arr1)
// console.log("Result arr after map :-", result)


// .reduce Method
// const arr1 = [1,2,3,4,5,6,7,8,9];

// let result = arr1.reduce((accumulator, current)=>{
//     let total = accumulator+current;
//     return total;
// }, 100)                          // Explicit defined initial value = 100

// let min = arr1.reduce((prev, curr)=>{
//     return Math.min(prev,curr)
// })

// console.log("Result :-",result)
// console.log("Min :-", min)



// .find() method
// const arr1 = [1,2,3,4,5,6,7,8,9];
// let result = arr1.find((element)=>{
//     return element > 5
// })
// console.log(result)



// .filter() method
// const arr1 = [1,2,3,4,5,6,7,8,9];
// let result = arr1.filter((ele)=>
//     ele > 5
// )
// console.log(result)



// .sort() method
// const arr1 = [42, 7, 19, 3, 25, 8, 15, 1, 30];
// const stringArr = ["banana", "apple", "cherry", "mango", "grape", "orange", "kiwi"];

// let result = arr1.sort()
// let result2 =  stringArr.sort()
// console.log(result)
// console.log(result2)


// sort and map method to demostrate the uneven sorting of upper number array
const arr1 = [42, 7, 19, 3, 25, 8, 15, 1, 30];
let result = arr1.sort()

console.log(`Sorted Array Result :- ${result}`)

let arr2 = [];
arr1.forEach((element, index) => {
    arr2[index] = element.toString()
});

let resultMapped = arr2.map((curr)=>{
    let currArr = []

    for(let i=0; i<curr.length; i++){
        currArr.push(curr.charCodeAt(i))
    }
    return "Value :-"+ curr + "-" + "UTF-16 code is :- " + currArr.join() + "\n";               // so now we know why the numbers are not sorted as it should be.
})

console.log(resultMapped)






// const nestedArray = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, "deepseek"]]]]]]]]]];
// console.log("Nested :-", nestedArray)
// console.log("Flatten :-", nestedArray.flat(Infinity))