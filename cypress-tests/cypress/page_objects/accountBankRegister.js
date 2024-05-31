class AccountBankRegister {
    userOnboardingNext() {
        cy.get('[data-test="user-onboarding-next"]').click();
    }
    bankNameInput() {
        cy.get("#bankaccount-bankName-input").type("Bank of Romania");
    }
    bankRoutingInput() {
        cy.get("#bankaccount-routingNumber-input").type("000123456");
    }
    bankAccountNumber() {
        cy.get("#bankaccount-accountNumber-input").type("013156473");
    }
    bankAccountSubmit() {
        cy.get('[data-test="bankaccount-submit"]').click();
    }
    userLoginTest() {
        cy.url().should("eq", "http://localhost:3000/");
    }
}
export default AccountBankRegister