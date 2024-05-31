class BankAccountPage {
    clickBankAccounts() {
        cy.get('[data-test="sidenav-bankaccounts"]').click();
    }
    addNewBankAccount(bankName, routingNumber, accountNumber) {
        cy.get('[data-test="bankaccount-new"]').click();
        cy.get("#bankaccount-bankName-input").type(bankName);
        cy.get("#bankaccount-routingNumber-input").type(routingNumber);
        cy.get("#bankaccount-accountNumber-input").type(accountNumber);
        cy.get('[data-test="bankaccount-submit"]').click();
    }
    verifyBankAccount(bankName) {
        cy.contains('[data-test="bankaccount-list"]', bankName).should("be.visible");
    }
    deleteBankAccount(bankName) {
        cy.contains('[data-test="bankaccount-list"]', bankName).parent().find('[data-test="bankaccount-delete"]').first().click();
        cy.contains('[data-test="bankaccount-list"]', `${bankName} (Deleted)`).should("exist");
    }
}
export default BankAccountPage