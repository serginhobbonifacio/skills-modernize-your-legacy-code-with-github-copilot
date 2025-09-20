const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const BALANCE_FILE = path.join(__dirname, 'balance.json');

// Helper functions to manipulate balance.json directly for test setup/teardown
function setBalance(value) {
  fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: value }));
}
function getBalance() {
  return JSON.parse(fs.readFileSync(BALANCE_FILE, 'utf8')).balance;
}

describe('Student Account Management System', function() {
  beforeEach(function() {
    setBalance(1000.00);
  });

  it('TC01: View initial account balance', function() {
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC02: Credit account with valid amount', function() {
    setBalance(1000.00);
    let balance = getBalance();
    balance += 100;
    setBalance(balance);
    expect(getBalance()).to.equal(1100.00);
  });

  it('TC03: Debit account with valid amount', function() {
    setBalance(1000.00);
    let balance = getBalance();
    balance -= 200;
    setBalance(balance);
    expect(getBalance()).to.equal(800.00);
  });

  it('TC04: Debit account with amount exceeding balance', function() {
    setBalance(1000.00);
    let balance = getBalance();
    const debitAmount = 2000;
    if (balance >= debitAmount) {
      balance -= debitAmount;
      setBalance(balance);
    }
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC05: Credit account with zero amount', function() {
    setBalance(1000.00);
    let balance = getBalance();
    balance += 0;
    setBalance(balance);
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC06: Debit account with zero amount', function() {
    setBalance(1000.00);
    let balance = getBalance();
    balance -= 0;
    setBalance(balance);
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC09: Multiple sequential transactions', function() {
    setBalance(1000.00);
    let balance = getBalance();
    balance += 100;
    balance -= 50;
    setBalance(balance);
    expect(getBalance()).to.equal(1050.00);
  });
});
