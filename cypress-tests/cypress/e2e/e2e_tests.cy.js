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
    signupPage.fillFirstName(userData.firstName);
    signupPage.fillLastName(userData.lastName);
    signupPage.fillUsername(userData.username);
    signupPage.fillPassword(userData.password);
    signupPage.fillConfirmPassword(userData.password);
    signupPage.submit();
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
    accountBankRegister.userLoginTest();
  });

  it("Should see account details and account balance", () => {
    accountDetails.userLoginTest();
    accountDetails.usernameCheck(userData);
    accountDetails.clickUserSettings();
    accountDetails.inputFirstName(userData);
    accountDetails.inputLastName(userData);
    accountDetails.checkUserBalance();
  });

  it("Should update account user settings", () => {
    userSettingsPage.clickUserSettings();
    userSettingsPage.fillEmail(userData.email);
    userSettingsPage.fillPhoneNumber(userData.phoneNumber);
    userSettingsPage.submit();
    userSettingsPage.verifyUserSettings(userData.firstName, userData.lastName, userData.email, userData.phoneNumber);
  });

  it("Should add new bank account", () => {
    bankAccountPage.clickBankAccounts();
    bankAccountPage.addNewBankAccount("Bank of New Romania", "654321000", "374651310");
    bankAccountPage.verifyBankAccount("Bank of New Romania");
  });

  it("Should delete bank account", () => {
    bankAccountPage.clickBankAccounts();
    bankAccountPage.deleteBankAccount("Bank of Romania");
  });

  it("Should submit account payment transaction and view transaction details", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.createNewTransaction();
    transactionPage.searchUser("Edgar Johns");
    transactionPage.fillTransactionDetails("10000", "Example of a test payment transaction.");
    transactionPage.submitPayment();
    transactionPage.paymentPayCheck();
    transactionPage.returnToTransactions();
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.verifyTransactionDetailVisible();
  });

  it("Should submit payment request transaction", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.createNewTransaction();
    transactionPage.searchUser("Edgar Johns");
    transactionPage.fillTransactionDetails("10000", "Example of a test request transaction.");
    transactionPage.submitRequest();
    transactionPage.paymentRequestCheck();
    transactionPage.returnToTransactions();
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.verifyTransactionDetailVisible();
  });

  it("Should be able to like and comment on transaction", () => {
    transactionPage.navigateToPersonalTab();
    transactionPage.viewFirstTransaction();
    transactionDetailPage.likeFirstTransaction();
    transactionDetailPage.verifyLikeCount("1");
    transactionDetailPage.commentOnTransaction("Example of a comment.");
    transactionDetailPage.verifyCommentVisible();
  });

  it("Should see account transaction history", () => {
    transactionPage.navigateToPersonalTab();
    transactionDetailPage.verifyTransactionHistoryExists();
  });
});