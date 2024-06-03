class BankAccountPage {
    get bankAccountsButton() {
        return cy.get('[data-test="sidenav-bankaccounts"]');
    }

    get newBankAccountButton() {
        return cy.get('[data-test="bankaccount-new"]');
    }

    get bankNameInput() {
        return cy.get("#bankaccount-bankName-input");
    }

    get routingNumberInput() {
        return cy.get("#bankaccount-routingNumber-input");
    }

    get accountNumberInput() {
        return cy.get("#bankaccount-accountNumber-input");
    }

    get submitButton() {
        return cy.get('[data-test="bankaccount-submit"]');
    }

    clickBankAccounts() {
        this.bankAccountsButton.click();
    }

    addNewBankAccount(bankName, routingNumber, accountNumber) {
        this.newBankAccountButton.click();
        this.bankNameInput.type(bankName);
        this.routingNumberInput.type(routingNumber);
        this.accountNumberInput.type(accountNumber);
        this.submitButton.click();
    }

    verifyBankAccount(bankName) {
        cy.contains('[data-test="bankaccount-list"]', bankName).should("be.visible");
    }

    deleteBankAccount(bankName) {
        cy.contains('[data-test="bankaccount-list"]', bankName).parent().find('[data-test="bankaccount-delete"]').first().click();
        cy.contains('[data-test="bankaccount-list"]', `${bankName} (Deleted)`).should("exist");
    }
}

export default BankAccountPage;
