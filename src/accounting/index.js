const readline = require('readline');
const fs = require('fs');
const BALANCE_FILE = __dirname + '/balance.json';

// Initialize balance if not present
function initBalance() {
  if (!fs.existsSync(BALANCE_FILE)) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
  }
}

function readBalance() {
  const data = fs.readFileSync(BALANCE_FILE, 'utf8');
  return JSON.parse(data).balance;
}

function writeBalance(newBalance) {
  fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: newBalance }));
}

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function main() {
  initBalance();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function promptMenu() {
    displayMenu();
    rl.question('Enter your choice (1-4): ', (choice) => {
      switch (choice.trim()) {
        case '1':
          handleViewBalance(promptMenu);
          break;
        case '2':
          handleCredit(promptMenu);
          break;
        case '3':
          handleDebit(promptMenu);
          break;
        case '4':
          console.log('Exiting the program. Goodbye!');
          rl.close();
          break;
        default:
          console.log('Invalid choice, please select 1-4.');
          promptMenu();
      }
    });
  }

  promptMenu();
}

function handleViewBalance(callback) {
  const balance = readBalance();
  console.log(`Current balance: ${balance.toFixed(2)}`);
  callback();
}

function handleCredit(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter credit amount: ', (amountStr) => {
    rl.close();
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount.');
      callback();
      return;
    }
    let balance = readBalance();
    balance += amount;
    writeBalance(balance);
    console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
    callback();
  });
}

function handleDebit(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter debit amount: ', (amountStr) => {
    rl.close();
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount.');
      callback();
      return;
    }
    let balance = readBalance();
    if (balance >= amount) {
      balance -= amount;
      writeBalance(balance);
      console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
    callback();
  });
}

main();
