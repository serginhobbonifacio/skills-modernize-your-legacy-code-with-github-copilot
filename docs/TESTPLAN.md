# Student Account Management System Test Plan

This test plan covers all business logic implemented in the COBOL application. Use this plan to validate the system with business stakeholders and as a basis for future unit and integration tests in Node.js.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|--------------|--------------------|----------|
| TC01 | View initial account balance | App is started; no prior transactions | 1. Start app<br>2. Select 'View Balance' | Balance displayed as 1000.00 |  |  |  |
| TC02 | Credit account with valid amount | App is started; balance is 1000.00 | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 100 | Balance updated to 1100.00; confirmation displayed |  |  |  |
| TC03 | Debit account with valid amount | App is started; balance is 1000.00 | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 200 | Balance updated to 800.00; confirmation displayed |  |  |  |
| TC04 | Debit account with amount exceeding balance | App is started; balance is 1000.00 | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 2000 | Error message displayed: 'Insufficient funds for this debit.'; balance remains 1000.00 |  |  |  |
| TC05 | Credit account with zero amount | App is started; balance is 1000.00 | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 0 | Balance remains 1000.00; confirmation displayed |  |  |  |
| TC06 | Debit account with zero amount | App is started; balance is 1000.00 | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 0 | Balance remains 1000.00; confirmation displayed |  |  |  |
| TC07 | Invalid menu selection | App is started | 1. Start app<br>2. Enter invalid choice (e.g., 5) | Error message displayed: 'Invalid choice, please select 1-4.' |  |  |  |
| TC08 | Exit application | App is started | 1. Start app<br>2. Select 'Exit' | App displays exit message and terminates |  |  |  |
| TC09 | Multiple sequential transactions | App is started; balance is 1000.00 | 1. Credit 100<br>2. Debit 50<br>3. View Balance | Balance reflects all transactions (e.g., 1050.00) |  |  |  |

*Fill in Actual Result, Status, and Comments after executing each test case.*
