//task 1

let str = "deloitte"                                                // O(n^2) complexity:(
let strArr = str.split('')
let dupArr =[]
for(let i=0; i<strArr.length ; i++){
    // console.log(strArr[i])
    for(let j=i+1; j<strArr.length ; j++){
        if(strArr[i]==strArr[j]){
            // console.log("i-",strArr[i], "j-", strArr[j])
            dupArr.push(strArr[j])
        }
        
    }
}

let res = []

function isExists(i){
    let flag=false;
    dupArr.forEach((val)=>{
        if(val == i){
            // console.log('inside dupArr', val, i)
            flag = true;
        }
    })
    
    if(flag==true){
        return true;
    }else{
        return false
    }
}

for(let i of strArr){
    if(!isExists(i)){
        res.push(i)
        // console.log('true')
    }
    // console.log('false')
    
}

// console.log(dupArr)
// console.log(res)
const strRes = res.join('')
console.log(strRes)

// false
// inside dupArr e e
// false
// false
// false
// false
// inside dupArr t t
// false
// inside dupArr t t
// false
// inside dupArr e e
// false
// [ 'e', 't' ]
// [
//   'd', 'e', 'l',
//   'o', 'i', 't',
//   't', 'e'
// ]



//task 2

const input = {
	user: {
		name: "Alice",
		contact: {
			email: "alice@example.com",
			phone: {
				mobile: "1234567890",
				landline: "0112345678"
			}
		},
		preferences: {
			notifications: {
				email: true,
				sms: false
			},
			theme: "dark"
		}
	},
	meta: {
		createdAt: "2025-07-29",
		verified: true
	}
};

let result ={}
function flattenObject(input, parent=''){
    // for(let key in input){
    //     console.log("key-",key)
    //     console.log(typeof key)
    // }
    // let keys = []


        // console.log('yes its obj')
        for(let key in input){

            // console.log("key-", key)
            // console.log(typeof input)
            // keys.push(key) 
            const newKey =  parent ? `${parent}.${key}` : key
            // console.log( "newKey", newKey)
            // console.log(typeof `${parent}`)
            // console.log(typeof input[key], 'keyyy')
            let value = input[key]
            // console.log(typeof value, 'keyyy')
            
            if(typeof value == 'object' && value !== null ){
                flattenObject(value, newKey)
            }else{
                result[newKey] = value
            }
            }
        
        // console.log(result)
    
}


const res = flattenObject(input);

// const res = input
//console.log(res)
console.log(result)

// console.log({...input})
// console.log(input.user.contact.phone)
// console.log(typeof input.user.contact)


// {
//   user: {
//     name: 'Alice',
//     contact: { email: 'alice@example.com', phone: [Object] },
//     preferences: { notifications: [Object], theme: 'dark' }
//   },
//   meta: { createdAt: '2025-07-29', verified: true }
// }





//output
// {
// 	"user.name": "Alice",
// 	"user.contact.email": "alice@example.com",
// 	"user.contact.phone.mobile": "1234567890",
// 	"user.contact.phone.landline": "0112345678",
// 	"user.preferences.notifications.email": true,
// 	"user.preferences.notifications.sms": false,
// 	"user.preferences.theme": "dark",
// 	"meta.createdAt": "2025-07-29",
// 	"meta.verified": true
// }