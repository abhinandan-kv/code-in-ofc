// // Implicit COnversions
// let val1 = 10,val2 = "10", result;
// result = val1+val2;
// console.log("Val1 type :- ", typeof(val1), "\nVal2 type :- ", typeof(val2))
// console.log("Value :- ",result, "\nType is :-", typeof(result))

// // Explicit Conversions
// let val1 = 10, val2 = '10', result;
// result = val1 + parseInt(val2);
// console.log("Val1 type :- ", typeof(val1), "\nVal2 type :- ", typeof(val2))
// console.log("Value :- ",result, "\nType is :-", typeof(result))

let val1 = true;
let val2 = ""       // boolean false
let result = val1 & Boolean(val2);
console.log("Type of val1 :- ", typeof(val1), "\nType of val2 :- ", typeof(Boolean(val2)))
console.log(result, typeof(result))             // becz bitwise will always return an integer value.
