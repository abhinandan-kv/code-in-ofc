// CALLBACK HELL - Nested callbacks, it gets complicated as it grows as the delays are unknown during fetching, so the deeply nested callbacks should be avoided as error handling also get complicated. And keep the callback simple and independent as possibile as it can.

function call1(callback) {
  setTimeout(() => {
    //added timout for atificial delay
    console.log("inside call1");
    callback(call3);
  }, 2000);
}
function call2(callback) {
  setTimeout(() => {
    console.log("Inside call2");
    callback();
  }, 2000);
}
function call3(callback) {
  console.log("Inside call3");
  callback()
}

// Method 1
// function main() {
//   console.log("Inside main function");
//   call1(call2);
// }
// main();             // this will throw an error because of callback() present in call3 func. its their because of Method 3 to represent .

// Method 2
// (() => {
//   console.log("Inside main function");
//   call1(call2);
// })();              // this will throw an error because of callback() present in call3 func. its their because of Method 3 to represent .

// Method 3
call1(()=>{
    call2(()=>{
        call3(()=>{
            console.log("Inside main func.")
        })
    })
})

