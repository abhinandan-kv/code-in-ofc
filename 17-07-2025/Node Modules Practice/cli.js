import readline from 'readline'
// Create interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Menu options
const menu = {
  1: 'Show current time',
  2: 'Show system info',
  3: 'Show memory usage',
  4: 'Exit'
};

// Function to display menu
function displayMenu() {
  console.log('\n===== MAIN MENU =====');
  for (const [key, value] of Object.entries(menu)) {
    console.log(`${key}: ${value}`);
  }
  console.log('====================\n');
}

// Function to handle menu selection
async function handleMenu() {
  let running = true;

  while (running) {
    displayMenu();

    const answer = await askQuestion('Select an option: ');

    switch (answer) {
      case '1':
        console.log(`Current time: ${new Date().toLocaleTimeString()}`);
        break;

      case '2':
        console.log('System info:');
        console.log(`Platform: ${process.platform}`);
        console.log(`Node.js version: ${process.version}`);
        console.log(`Process ID: ${process.pid}`);
        break;

      case '3':
        const memory = process.memoryUsage();
        console.log('Memory usage:');
        for (const [key, value] of Object.entries(memory)) {
          console.log(`${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`);
        }
        break;

      case '4':
        console.log('Exiting program. Goodbye!');
        running = false;
        break;

      default:
        console.log('Invalid option. Please try again.');
      }

      if (running) {
        await askQuestion('\nPress Enter to continue...');
        console.clear(); // Clear console for better UX
      }
  }
}

// Promise-based question function
function askQuestion(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

// Start the interactive menu
handleMenu()
  .finally(() => {
    rl.close();
  }); 