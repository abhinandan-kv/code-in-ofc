// ================= THIS FILE IS THE DEMOSTRATION OF 8 PROMISES METHOD IMPLEMENTATIONS, EACH EXMAPLE INSIDE CODE TAG ARE TESTED & SCRIPT.JS FILE HAS ALL THE CODES TOO ====================
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



// Promises:- It is used to handle async operations like API handling, file I/O operations, etc.

//                              ==== Pending
//                              =
//                              =
// Promises have 3 states:- ===== == Fulfilled
//                              =
//                              =
//                              ==== Rejected


// 1. Promise.all()  = Returns an array of results if all promise resolves, but immediately stops as any task rejects, it will not return an array.
{/* <code>
    Promise.all([
        Promise.resolve("Task 1"),
        Promise.resolve("Task 2"),
        Promise.reject("Task 3 failed")
    ])
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log(error)});
</code> */}

// 2. Promise.allSettled() = Return an list of arrays of result whether promises fulfill or rejects. 

{/* <code>
    Promise.allSettled([
        Promise.resolve("Task 1"),
        Promise.reject("task 2"),
        Promise.resolve("task 3")
    ]).then((result)=>{console.log(result)})
    .catch((error)=>{console.log(error)})
</code> */}


// 3. Promise.race() = This method resolves or reject as soon as any promise settles(ie. fullfiled or rejects).

{/* <code>
    Promise.race([                       // here we are also using new promise and making our own promise, which has 2 things resolve, reject.
        new Promise((resolve)=> setTimeout(() => {
                resolve("Task 1")
        }, 500)),
        new Promise((resolve)=> setTimeout(()=>{
                resolve("Task 2")
        }, 100)),
    ]).then((result)=>{console.log(result)});
</code> */}


// 4. Promise.any() = This method resolves with the first fulfilled promise, if all promises rejected it gives and aggregation error. (aggregation error eg- Uncaught AggregateError AggregateError: All promises were rejected    at (program) (<node_internals>/internal/process/promises:394:4)promises:394 Process exited with code 1)

{/* <code>
    Promise.any([
        Promise.reject("Task 1"),
        Promise.resolve("Task 2"),
        Promise.reject("Task 3")
    ])
    .then((result)=>{console.log(result)})
</code> */}


// 5. Promise.resolve() = This method resolves with a given value, the same we have been doing in abouve exmamples.

{/* <code>
    Promise.resolve("Task 1")
    .then((result)=>{console.log(result)})
</code> */}



// 6. Promise.reject() = This method rejects a promise with a error reason.
{/* <code>
    Promise.reject("Task 1")
    .catch((error)=>{console.log(error)})
</code> */}


// 7. Promise.finally() = This method is just like a cleanup function that executes everytime regardless of the promises reejcts or fullfilled.
{/* <code>
    Promise.resolve("Task 1")
        .then((result)=> console.log(result))
        .catch((error)=>console.error(error))
        .finally(()=>console.log("msges"))    
</code> */}


// 8. Promise.prototype.then() = This method allows to chain multiple then commands, and also allows data passing to next then(). The real-world example of this is when we do something like we need a img from use and parse it with the help of some ai like caption stuff then store in the company/project cloud storage, so we can pass the data too the chaining then events.
//  <code>
//         Promise.resolve(5)
//         .then((value)=>++value)
//         .then((value2)=>value2 += 10)                
//         .then((value3)=>console.log(value3))
// </code>
// IMPORTANT MSG = This example shows the difference between implicit and explicit arrow function. Means arrow function with curly {} braces are called implicit that will not return anything till
//                 we use return keyword and return something, on the other hand the arrow function without curly {} braces are called explicit that will return the value without even mentioning
//                 the return keyword.


