class SignupPage {
    visit() {
        cy.visit("http://localhost:3000/signup");
    }
    fillFirstName(firstName) {
        cy.get("#firstName").type(firstName);
    }
    fillLastName(lastName) {
        cy.get("#lastName").type(lastName);
    }
    fillUsername(username) {
        cy.get("#username").type(username);
    }
    fillPassword(password) {
        cy.get("#password").type(password);
    }
    fillConfirmPassword(password) {
        cy.get("#confirmPassword").type(password);
    }
    submit() {
        cy.get('[data-test="signup-submit"]').should("be.visible").and("not.be.disabled").click();
    }
}
export default SignupPage