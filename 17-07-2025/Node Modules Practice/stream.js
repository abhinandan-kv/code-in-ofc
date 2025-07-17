import fs from 'fs'

// Create a readable stream from a file
const readableStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

// Events for readable streams
readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  console.log(chunk);
});

readableStream.on('end', () => {
  console.log('No more data to read.');
});

readableStream.on('error', (err) => {
  console.error('Error reading from stream:', err);
}); 

// Create readable and writable streams
const writableStream = fs.createWriteStream('destination.txt');

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

// Handle completion and errors
readableStream.on('error', (err) => {
  console.error('Read error:', err);
});

writableStream.on('error', (err) => {
  console.error('Write error:', err);
});

writableStream.on('finish', () => {
  console.log('File copy completed!');
}); 