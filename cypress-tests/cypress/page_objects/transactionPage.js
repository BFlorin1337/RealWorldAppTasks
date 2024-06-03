class TransactionPage {
    get personalTab() {
        return cy.get('[data-test="nav-personal-tab"]');
    }
    get newTransactionButton() {
        return cy.get('[data-test="nav-top-new-transaction"]');
    }
    get searchInput() {
        return cy.get("#user-list-search-input");
    }
    get amountInput() {
        return cy.get("#amount");
    }
    get descriptionInput() {
        return cy.get("#transaction-create-description-input");
    }
    get submitPaymentButton() {
        return cy.get('[data-test="transaction-create-submit-payment"]');
    }
    get submitRequestButton() {
        return cy.get('[data-test="transaction-create-submit-request"]');
    }
    get returnToTransactionsButton() {
        return cy.get('[data-test="new-transaction-return-to-transactions"]');
    }
    get firstTransactionItem() {
        return cy.get('[data-test^="transaction-item"]').first();
    }
    navigateToPersonalTab() {
        this.personalTab.click();
    }
    createNewTransaction() {
        this.newTransactionButton.click();
    }
    searchUser(username) {
        this.searchInput.type(username, { force: true });
        cy.contains('[data-test="users-list"] li', username).click({ force: true });
    }
    fillTransactionDetails(amount, description) {
        this.amountInput.type(amount);
        this.descriptionInput.type(description);
    }
    submitPayment() {
        this.submitPaymentButton.click();
    }
    submitRequest() {
        this.submitRequestButton.click();
    }
    paymentPayCheck() {
        cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Paid $10,000.00 for Example of a test payment transaction.");
    }
    paymentRequestCheck() {
        cy.get(".MuiGrid-root.MuiGrid-item").should("contain", "Requested $10,000.00 for Example of a test request transaction.");
    }
    returnToTransactions() {
        this.returnToTransactionsButton.click();
    }
    viewFirstTransaction() {
        this.firstTransactionItem.click({ force: true });
    }
}
export default TransactionPage;