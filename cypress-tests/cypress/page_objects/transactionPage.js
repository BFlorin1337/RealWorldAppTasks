class TransactionPage {
    navigateToPersonalTab() {
        cy.get('[data-test="nav-personal-tab"]').click();
    }
    createNewTransaction() {
        cy.get('[data-test="nav-top-new-transaction"]').click();
    }
    searchUser(username) {
        cy.get("#user-list-search-input").type(username, { force: true });
        cy.contains('[data-test="users-list"] li', username).click({ force: true });
    }
    fillTransactionDetails(amount, description) {
        cy.get("#amount").type(amount);
        cy.get("#transaction-create-description-input").type(description);
    }
    submitPayment() {
        cy.get('[data-test="transaction-create-submit-payment"]').click();
    }
    paymentPayCheck() {
        cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Paid $10,000.00 for Example of a test payment transaction.");
    }
    paymentRequestCheck() {
        cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Requested $10,000.00 for Example of a test request transaction.");
    }
    submitRequest() {
        cy.get('[data-test="transaction-create-submit-request"]').click();
    }
    returnToTransactions() {
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    }
    viewFirstTransaction() {
        cy.get('[data-test^="transaction-item"]').first().click({ force: true });
    }
}
export default TransactionPage;