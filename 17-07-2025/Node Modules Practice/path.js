import path from 'path'

const filename = path.basename('Node modules Practice/large-file.txt');
console.log(filename);



console.log(`Path separator: ${JSON.stringify(path.sep)}`); 

const parts = ['users', 'docs', 'file.txt'];
const filePath = parts.join(path.sep);
console.log('Built path:', filePath);
