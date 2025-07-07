//===================================== ALL CODES HERE ARE PRACTICED IN BROWSER CONSOLE AND W3 WEB CODE EDITOR =================================



// Javascript definition: Javascript is a programming language developed by Brendan Eich that is used in both frontend and backend development, it is a synchronous in nature (it executes code line by line) 
// but with the es6 update it supports async. It is cross-device-compatible language.




// ===================================================================================
                            //  Closures
                            // ----------
// Definition: Its a JS feature that lets us access the variables and parameters of outerfunction even after it finished executing. It solves the issue of maintaining and declaring variables multiple times.
// 
// Example:-
    // Suppose you want to create a add function and call it multiple times, so inorder to do this you need to declare a variable wheather in global scope or block scope like this: 
    //  <code>
    //     let number = 0;
    //     function add(){
    //         number++
    //     }

    //     add()
    //     add()
    //     add()        
    //  console.log(number) //output: 3
    //  </code>
    //  but with this issue is number variable can be changed from anywhere in the code without even calling the add() function, 

    //  now if we declare the number variable inside the add() function as a block level scope, now the issue is you cant access the number variable from outside the function.


    //  Here comes the closure concept, which gives us the option to have a private variable and even access the inner function. 
    //  eg: <code>
        // function add(){
        //     let number = 0;
        //     return function (){
        //         number++;
        //         return number;
        // }
        // 
        //     const addition = add()
        //     addition()
        //     addition()
        //     console.log(addition()) // output:3
    //  </code>



// ===================================================================================
                            //  Hoisting
                            // ----------
// Definition: Hoisting is nothing but the a process where the interpreter move the declaration of variables(var, let, const) on top of their scope ie. block or global. 
// This process happens prior to the execution of the code. Hoisting has to do with the TDZ(Temporal Dead Zone) which is a critical concept of javascript , it refers to the time period of 
// entering of a scope and actual initilization of the variable declared with let or const, during this time any referance of any varible will throw an error if it initilized before declaration.
//  Thats why to solve this the hoisting comes into the picture.

    // var: the var varible can be declared after the initilization , but the let and const cannot it will throw - [cant access lexical declaration without initiazation]
    // Examples:
    // <code>
    //     num++;
    //     console.log(num)  // Output: undefined

    //     var num = 10;     //- declaration and initiazation
    // </code>

    // <code>
    //     num = 10;
    //     num++               //- initialization
    //     console.log(num)   // Output: 11

    //     var num;           //- declaration ONLY
    // </code>

    // <code>
    //      num = 10;          //- initialization
    //      console.log(num)   // throws the error- [can't access lexical declaration 'num' before initialization]
    //      
    //      let num;           //- declaration ONLY
    // </code>

    //<code>    
    //      let num = 10        // declaration and initialization | usual way and most common.
    //      console.log(num)    // output: 10
    // </code>
    
    // For demo try this code:-
    // <code>

    //         try{
    //         x = 5; // Assign 5 to x
    //         }
    //         catch(err){
    //         console.clear()
    //         console.log(err.message)
    //         }

    //         let x; // Declare x

    // </code>



// ===================================================================================
                            // Variables
                            // ----------
// Definition: Variables in javascript are nothing but a named container that is used to store data. It can be referenced or manipulated thorugh out their scope.
//             Variable names should be start with a letter, underscore or dollar sign($), variable names are case-sensitive, and reserved words cant be used for variable names.
//             Their is also a concept of Variable Shadowing that means the a global variable x is also declared inside a function with a different value, through outer variable value will reamin unchanged.
//       Variables can be declared by 2 types.
//          1. Explicit declartions: Explicit declartions means when we declare a variable with explicit mentioning the type scope of it, we can use var, let, const for this.
//                                        (i) var has a function level scope, it can be redeclared and its mulatable.
//                                        (ii) let has a block level scope, that means it cant be accessed outside of its block scope, it cant be redeclared and its mulatable.
//                                        (iii) const has a block level scope, that means it cant be accessed outside of its block scope, it cant be redeclared and its not mulatable.
//          2. Implicit declaration: Implicit declaration is nothing but a direct initialization of a variable. though this technique is not used and its not recommended overall, and the JavaScript strict mode will throw an error.


// Examples: 
// <code>
    //  var str = "this is a global scope variable"
    //  function myfunc(){
    //      var str = "i was a global scope variable but i can be redeclared"
    //      console.log(str)
    //  }
    //  myfunc()
    //  console.log(str)
// </code>
// So from above example it shows how global scope works and how redeclaration works. The same you can do with let and const as redeclaration create a new variable with different scopes, but be sure you cant change a const values (you need to do variable shadowing if you want to use same variable name)




// ===================================================================================
                            // Datatypes
                            // ----------
// Definition: Datatypes are just a kind of value a variable is defined on and what kind of operations it can be operated on. Variables are of 2 types - Primitive datatype and Non-Primitive dataType.
//             1. Primitive Datatype: Primitive datatype is predefined data types in JS.
//                      (i)   Number
//                      (ii)  String
//                      (iii) Boolean
//                      (iv)  Null
//                      (v)   undefined
//                      (vi)  Symbol
//                      (vii) BigInt
//
//             2. Non-Primitive Datatype: Non-Primitive datatype are also defined as derived datatype or reference datatype.
//                      (i)   Object
//                      (ii)  Array
//                      (iii) Function
//                      (iv)  Date Object
//                      (v)   Regular Expression (RegExp)                                                                                                                                
// 
// <code>
//  Primitive Datatypes examples:- 
//     let num = 10
//     let str = 'is it a string'
//     let check = true
//     let isNull = null
//     let isUndefined = undefined
//     const isSymbol = Symbol("&")
//     const isBigInt = BigInt("2397512321392573254705230947")
// 
//     console.log(typeof num)
//     console.log(typeof str)
//     console.log(typeof check)
//     console.log(typeof isNull)
//     console.log(typeof isUndefined)
//     console.log(typeof isSymbol)
//     console.log(typeof isBigInt)
// </code>
// 

// <code>
//     Non-Primtive Objects:-
//     let vsc = {
//         type: "code editor",
//         founder: "microsoft"
//     }
//     console.log(typeof vsc)
//     console.log(vsc.type)
// </code>
// <code>
//     Non-Primitive Arrays-
//     let array1 = ["1","2"]
//     console.log(typeof array1)
//     console.log(array1[1])
// </code>
// <code>
//     Non-Primitive Date Object:-
//     let newDate = new Date()
//     console.log(newDate)
//     console.log(typeof newDate)
// </code>
// <code>
//     Non-Primitive RegExp :-
//     let value = /robot/
//     let results = value.test("robots are good")
//     console.log(results)             // output: true , reason becz it will get the robot is exist or not if it is then true, remember its case sensitive.
// </code>



// ===================================================================================
                            // Functions
                            // ----------
// Definition: Function are reusable block of codes that are meant to perform specific tasks, functions improves code reusability, improves readablity and breaks complex code into manageable pieces.
//                  (i) Normal Function 
//                  (ii) Function expression
//                  (iii) Arrow Function
//                  (iv) IIFE (immediate invoked function expression)
//                  (v) Nested Function
//                  (vi) Callback Function
//                  Not explaining here in deep becz word itself are self explainable.

// Examples:
// Normal function:
// <code>
//     function myFunc(arg1,arg2){
//         console.log(arg1,arg2)
//     }
//     let para1 = 1, para2 = 2;
//     myFunc(para1,para2)
// </code>
// Function expression:-
// <code>
//     const myFunc = function (arg1) {
//         return arg1
//     } 
//     let para1 = "something here"
//     myFunc(para1)
// </code>
// Arrow Function:-
// <code>
//     setTimeout(() => {
//         console.log("something is here at 1s delay")
//     }, 1000);
// </code>



