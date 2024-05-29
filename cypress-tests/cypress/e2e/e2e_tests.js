let userData;

before(() => {
  cy.fixture('users').then((user) => {
    userData = user;
  });
});

describe("E2E tests on a Cypress Real World App demo", () => {

  before(() => {
    cy.visit("http://localhost:3000/signup");
    cy.get("#firstName").type(userData.firstName);
    cy.get("#lastName").type(userData.lastName);
    cy.get("#username").type(userData.username);
    cy.get("#password").type(userData.password);
    cy.get("#confirmPassword").type(userData.password);
    cy.get('[data-test="signup-submit"]').should("be.visible").and("not.be.disabled").click()
  });

  beforeEach(() => {
    cy.login(userData.username, userData.password);
  });

  it("Should register a new account and log in", () => {
    cy.get('[data-test="user-onboarding-next"]').click();
    cy.get("#bankaccount-bankName-input").type("Bank of Romania");
    cy.get("#bankaccount-routingNumber-input").type("000123456");
    cy.get("#bankaccount-accountNumber-input").type("013156473");
    cy.get('[data-test="bankaccount-submit"]').click();
    cy.get('[data-test="user-onboarding-next"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Should see account details and account balance", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get('[data-test="sidenav-username"]').should("have.text", "@" + userData.username);
    cy.get('[data-test="sidenav-user-settings"]').click();
    cy.get("#user-settings-firstName-input").should("have.value", userData.firstName);
    cy.get("#user-settings-lastName-input").should("have.value", userData.lastName);
    cy.get('[data-test="sidenav-user-balance"]').should("have.text", "$0.00");
  });

  it("Should update account user settings", () => {
    cy.get('[data-test="sidenav-user-settings"]').click();
    cy.get("#user-settings-email-input").clear().type(userData.email).should("have.value", userData.email);
    cy.get("#user-settings-phoneNumber-input").clear().type(userData.phoneNumber).should("have.value", userData.phoneNumber);
    cy.get('[data-test="user-settings-submit"]').click();
    cy.get("#user-settings-firstName-input").should("have.value", userData.firstName);
    cy.get("#user-settings-lastName-input").should("have.value", userData.lastName);
    cy.get("#user-settings-email-input").should("have.value", userData.email);
    cy.get("#user-settings-phoneNumber-input").should("have.value", userData.phoneNumber);
  });

  it("Should add new bank account", () => {
    cy.get('[data-test="sidenav-bankaccounts"]').click();
    cy.get('[data-test="bankaccount-new"]').click();
    cy.get("#bankaccount-bankName-input").type("Bank of New Romania");
    cy.get("#bankaccount-routingNumber-input").type("654321000");
    cy.get("#bankaccount-accountNumber-input").type("374651310");
    cy.get('[data-test="bankaccount-submit"]').click();
    cy.contains('[data-test="bankaccount-list"]', "Bank of New Romania").should("be.visible");
  });

  it("Should delete bank account", () => {
    cy.get('[data-test="sidenav-bankaccounts"]').click();
    cy.contains('[data-test="bankaccount-list"]', "Bank of Romania").parent().find('[data-test="bankaccount-delete"]').first().click();
    cy.contains('[data-test="bankaccount-list"]', "Bank of Romania (Deleted)").should("exist");
  });

  it("Should submit account payment transaction and view transaction details", () => {
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test="transaction-list-empty-create-transaction-button"]').click();
    cy.get("#user-list-search-input").type("Edgar Johns", { force: true });
    cy.contains('[data-test="users-list"] li', 'Edgar Johns').click({ force: true });
    cy.get("#amount").type("10000");
    cy.get("#transaction-create-description-input").type("Example of a test payment transaction.");
    cy.get('[data-test="transaction-create-submit-payment"]').click();
    cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Paid $10,000.00 for Example of a test payment transaction.");
    cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test^="transaction-item"]').first().click({ force: true });
    cy.contains('[data-test="transaction-detail-header"]', 'Transaction Detail').should('be.visible');
  });

  it("Should submit payment request transaction", () => {
    cy.get('[data-test="nav-top-new-transaction"]').click();
    cy.get("#user-list-search-input").type("Edgar Johns", { force: true });
    cy.contains('[data-test="users-list"] li', 'Edgar Johns').click({ force: true });
    cy.get("#amount").type("10000");
    cy.get("#transaction-create-description-input").type("Example of a test request transaction.");
    cy.get('[data-test="transaction-create-submit-request"]').click();
    cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Requested $10,000.00 for Example of a test request transaction.");
    cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test^="transaction-item"]').first().click({ force: true });
    cy.contains('[data-test="transaction-detail-header"]', 'Transaction Detail').should('be.visible');
  });

  it("Should be able to like and comment on transaction", () => {
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test^="transaction-item"]').first().click({ force: true });
    cy.get('[data-test^="transaction-like-button-"]').first().click();
    cy.get('[data-test^="transaction-like-count-"]').first().should("contain", "1");
    cy.get('[data-test^="transaction-comment-input-"]').first().type("Example of a comment.").type("{enter}");
    cy.get('[data-test^="transaction-comment"]').should("be.visible");
  });

  it("Should see account transaction history", () => {
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test^="transaction-list"]').should("exist");
  });
});
