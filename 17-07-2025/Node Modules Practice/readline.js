import readline from 'readline'

// Create interface for input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask a question and handle the response
rl.question('What is your name? ', (name) => {
  console.log(`Hello, ${name}!`);

  // Ask follow-up question
  rl.question('How old are you? ', (age) => {
    console.log(`In 5 years, you'll be ${parseInt(age) + 5} years old.`);

    // Close the interface when done
    rl.close();
  });
});

// Handle application exit
rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
}); 