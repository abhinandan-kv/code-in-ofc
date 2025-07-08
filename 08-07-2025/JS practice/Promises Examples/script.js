    // Promise.all([
    //     Promise.resolve("Task 1"),
    //     Promise.resolve("Task 2"),
    //     Promise.reject("Task 3")
    // ])
    // .then((result)=>{console.log(result)})
    // .catch((error)=>{console.log(error)});


    // Promise.allSettled([
    //     Promise.resolve("Task 1"),
    //     Promise.reject("task 2"),
    //     Promise.resolve("task 3")
    // ]).then((result)=>{console.log(result)})
    // .catch((error)=>{console.log(error)})



    // Promise.race([                      
    //     new Promise((resolve)=> setTimeout(() => {
    //             resolve("Task 1")
    //     }, 500)),
    //     new Promise((resolve)=> setTimeout(()=>{
    //             resolve("Task 2")
    //     }, 100)),
    // ]).then((result)=>{console.log(result)});



    // Promise.any([
    //     Promise.reject("Task 1"),
    //     Promise.reject("Task 3")
    // ])
    // .then((result)=>{console.log(result)})



    // Promise.resolve("Task 1")
    // .then((result)=>{console.log(result)})



    // Promise.reject("Task 1")
    // .catch((error)=>{console.error(error)})



        // Promise.resolve(5)
        // .then((value)=>++value)
        // .then((value2)=>value2 += 10)
        // .then((value3)=>console.log(value3))


    Promise.resolve("Task 1")
        .then((result)=> console.log(result))
        .catch((error)=>console.error(error))
        .finally(()=>console.log("msges")) 