// //////// OPERATORS

//Arthemitic
// let num = 10;
// console.log("Sum : ",num + 10)
// console.log("Sub : ",num - 10)
// console.log("Mul : ",num * 2)
// console.log("Div : ",num / 2)
// console.log("Mod : ",num % 2)
// console.log("Exp : ",num**2)
// console.log("Incre. :",num++, "Decre :",num--)
// console.log("Uni + :", +num ,"Uni - :",-num )

// Assignment
// let num = 10
// console.log("Sum Assign : ", num+=100)
// console.log("Mul Assign : ", num*=2)

// Comparison
// < , > , == , === , != , !== , >= , <=

// Logical
// && , || , ! , ?? ,

// Bitwise
// & , | , ^ , ~ , << , >> , >>>
// console.log(10>>>2)

// ternary
// ? :

// Rest OP
// function myFunc(...args) {
//   console.log("Rest Represention before any other operations :-",  args);
//   let result = 0;
//   for (let i of args) {
//     result += i;
//   }
//   return result;
// }

// console.log("Sum final Output :-",myFunc(1, 2, 3, 4, 5, 6, 7, 8));

// Spread OP
const car = ["honda", "BMW", "BYD", "Tata", "Mercedes"];
const car2 = ["Lexus" , "Mahindra" , "Porche" , "Subaru" , "Dodge"]

console.log("Spreading both arrays directly :-",...car,...car2);

let allCar = [...car,...car2,"Lamborghini"]
console.log("New array created (but its a shallow copy remember) :- ",allCar)

