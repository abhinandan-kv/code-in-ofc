
let promise1 = new Promise((resolve) =>
  setTimeout(() => {
    console.log("Loggin in");
    resolve();
  }, 1000)
);
let promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Fetching Profile...");
    resolve();
}, 2000);
});
let promise3 = new Promise((resolve)=>
  setTimeout(() => {
    console.log("Fetching Orders...");
    resolve()
  }, 3000)
);


let allPromises = [promise1, promise2, promise3];

Promise.allSettled(allPromises).then(() => {
  console.log("All done!");
});


// task 12 - Sorting by Custom Logic 

let inputArr = ["hello", "hi", "world", "aeiou"];

function vowelCounter(str) {
    let vCount = 0;
    for (let i = 0; i < str.length; i++) {
        if ('aeiou'.includes(str[i].toLowerCase())) {
            vCount++;
        }
    }
    return vCount;
}

let result = inputArr.sort((a, b) => vowelCounter(b) - vowelCounter(a));
console.log(result);