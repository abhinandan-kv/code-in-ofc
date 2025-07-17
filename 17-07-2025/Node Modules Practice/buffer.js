// Create an uninitialized buffer of 10 bytes
const buffer2 = Buffer.allocUnsafe(10);
console.log(buffer2);

// Fill the buffer with zeros for security
buffer2.fill(1);
console.log(buffer2); 

const buffer3 = Buffer.from('Hello, World!');
console.log(buffer3);

console.log(buffer3.toString());

// Create a buffer from an array of integers
const buffer4 = Buffer.from([65, 66, 67, 68, 69]);
console.log(buffer4);

console.log(buffer4.toString());

// Create a buffer from another buffer
const buffer5 = Buffer.from(buffer4);
console.log(buffer5);

console.log('----------------------------------------------------')

const buffer11 = Buffer.from('ABC');
const buffer22 = Buffer.from('BCD');
const buffer33 = Buffer.from('ABC');

console.log(Buffer.compare(buffer11, buffer22));
console.log(Buffer.compare(buffer22, buffer11));
console.log(Buffer.compare(buffer11, buffer33)); 