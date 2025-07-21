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
