class AccountBankRegister {
    get onboardingNextButton() {
        return cy.get('[data-test="user-onboarding-next"]');
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
    userOnboardingNext() {
        this.onboardingNextButton.click();
    }
    fillBankName(bankName) {
        this.bankNameInput.type(bankName);
    }
    fillRoutingNumber(routingNumber) {
        this.routingNumberInput.type(routingNumber);
    }
    fillAccountNumber(accountNumber) {
        this.accountNumberInput.type(accountNumber);
    }
    submitBankAccount() {
        this.submitButton.click();
    }
    userLoginTest() {
        cy.url().should("eq", "http://localhost:3000/");
    }
}
export default AccountBankRegister;