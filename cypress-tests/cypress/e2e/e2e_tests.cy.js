import SignupPage from '../page_objects/signupPage';
import UserSettingsPage from '../page_objects/userSettingsPage';
import BankAccountPage from '../page_objects/bankAccountPage';
import AccountBankRegister from '../page_objects/accountBankRegister';
import AccountDetails from '../page_objects/accountDetails';
import TransactionPage from '../page_objects/transactionPage';
import TransactionDetailPage from '../page_objects/transactionDetailPage';

let userData;
const signupPage = new SignupPage();
const userSettingsPage = new UserSettingsPage();
const bankAccountPage = new BankAccountPage();
const accountBankRegister = new AccountBankRegister();
const accountDetails = new AccountDetails();
const transactionPage = new TransactionPage();
const transactionDetailPage = new TransactionDetailPage();

before(() => {
  cy.fixture('users').then((user) => {
    userData = user;
  });
});

describe("E2E tests on the RWA bank.", () => {

  before(() => {
    signupPage.visit();
    cy.url().should('include', '/signup');

    signupPage.fillFirstName(userData.firstName);
    signupPage.fillLastName(userData.lastName);
    signupPage.fillUsername(userData.username);
    signupPage.fillPassword(userData.password);
    signupPage.fillConfirmPassword(userData.password);
    signupPage.submitButton.should("be.visible").and("not.be.disabled").click();
  });

  beforeEach(() => {
    cy.login(userData.username, userData.password);
  });

  it("Should register a new account and log in", () => {
    accountBankRegister.userOnboardingNext();
    accountBankRegister.fillBankName("Bank of Romania");
    accountBankRegister.fillRoutingNumber("123456789");
    accountBankRegister.fillAccountNumber("987654321");
    accountBankRegister.submitBankAccount();
    accountBankRegister.userOnboardingNext();
    accountBankRegister.userLoginTest().should("eq", "http://localhost:3000/");
  });

  it("Should see account details and account balance", () => {
    accountDetails.userLoginTest().should("eq", "http://localhost:3000/");
    accountDetails.usernameCheck(userData).should("have.text", "@" + userData.username);
    accountDetails.clickUserSettings();
    accountDetails.inputFirstName(userData).should("have.value", userData.firstName);
    accountDetails.inputLastName(userData).should("have.value", userData.lastName);
    accountDetails.checkUserBalance().should("have.text", "$0.00");
  });

  it("Should update account user settings", () => {
    userSettingsPage.clickUserSettings();
    userSettingsPage.fillEmail(userData.email);
    userSettingsPage.fillPhoneNumber(userData.phoneNumber);
    userSettingsPage.submit();
    userSettingsPage.emailInput.should("have.value", userData.email);
    userSettingsPage.phoneNumberInput.should("have.value", userData.phoneNumber);
});

  it("Should add new bank account", () => {
    bankAccountPage.clickBankAccounts();
    bankAccountPage.addNewBankAccount("Bank of New Romania", "654321000", "374651310");
    bankAccountPage.verifyBankAccount("Bank of New Romania").should("be.visible");
  });

  it("Should delete bank account", () => {
    bankAccountPage.clickBankAccounts();
    bankAccountPage.deleteBankAccount("Bank of Romania").should("exist");
  });

  it("Should submit account payment transaction and view transaction details", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.createNewTransaction();
    transactionPage.searchUser("Edgar Johns");
    transactionPage.fillTransactionDetails("10000", "Example of a test payment transaction.");
    transactionPage.submitPayment();
    transactionPage.paymentPayCheck().should("contain", "Paid $10,000.00 for Example of a test payment transaction.");
    transactionPage.returnToTransactions();
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.verifyTransactionDetailVisible().should('be.visible');
  });

  it("Should submit payment request transaction", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.createNewTransaction();
    transactionPage.searchUser("Edgar Johns");
    transactionPage.fillTransactionDetails("10000", "Example of a test request transaction.");
    transactionPage.submitRequest();
    transactionPage.paymentRequestCheck().should("contain", "Requested $10,000.00 for Example of a test request transaction.");
    transactionPage.returnToTransactions();
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.verifyTransactionDetailVisible().should('be.visible');
  });

  it("Should be able to like and comment on transaction", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.likeFirstTransaction();
    transactionDetailPage.verifyLikeCount().should("contain", "1");
    transactionDetailPage.commentOnTransaction("Example of a comment.");
    transactionDetailPage.verifyCommentVisible().should("be.visible");
  });

  it("Should see account transaction history", () => {
    transactionPage.navigateToPersonalTab();
    transactionDetailPage.verifyTransactionHistoryExists().should("exist");
  });
});
