import url from 'url';

let adr = 'http://localhost:8080/default.htm?year=2017&month=february';
let q = url.parse(adr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let qdata = q.query;
console.log(qdata.month); 