class AccountDetails {
    userLoginTest() {
        cy.url().should("eq", "http://localhost:3000/");
    }
    usernameCheck(userData) {
        cy.get('[data-test="sidenav-username"]').should("have.text", "@" + userData.username);
    }
    clickUserSettings() {
        cy.get('[data-test="sidenav-user-settings"]').click();
    }
    inputFirstName(userData) {
        cy.get("#user-settings-firstName-input").should("have.value", userData.firstName);
    }
    inputLastName(userData) {
        cy.get("#user-settings-lastName-input").should("have.value", userData.lastName);
    }
    checkUserBalance() {
        cy.get('[data-test="sidenav-user-balance"]').should("have.text", "$0.00");
    }
}
export default AccountDetails;