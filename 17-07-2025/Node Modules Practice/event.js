import EventEmitter from 'events'

const myEmitter = new EventEmitter();

myEmitter.on('greet', () => {
  console.log('Hello there!');
});

myEmitter.emit('greet'); 

let eventEmitter = new EventEmitter();

let myEventHandler = function () {
  console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);

eventEmitter.emit('scream'); 