class SignupPage {
    visit() {
        cy.visit("http://localhost:3000/signup");
    }
    get firstNameInput() {
        return cy.get("#firstName");
    }
    get lastNameInput() {
        return cy.get("#lastName");
    }
    get usernameInput() {
        return cy.get("#username");
    }
    get passwordInput() {
        return cy.get("#password");
    }
    get confirmPasswordInput() {
        return cy.get("#confirmPassword");
    }
    get submitButton() {
        return cy.get('[data-test="signup-submit"]');
    }
    fillFirstName(firstName) {
        this.firstNameInput.type(firstName);
    }
    fillLastName(lastName) {
        this.lastNameInput.type(lastName);
    }
    fillUsername(username) {
        this.usernameInput.type(username);
    }
    fillPassword(password) {
        this.passwordInput.type(password);
    }
    fillConfirmPassword(password) {
        this.confirmPasswordInput.type(password);
    }
    submit() {
        this.submitButton.should("be.visible").and("not.be.disabled").click();
    }
}
export default SignupPage;