class AccountDetails {
    userLoginTest() {
        return cy.url();
    }
    usernameCheck(userData) {
        return cy.get('[data-test="sidenav-username"]');
    }
    clickUserSettings() {
        cy.get('[data-test="sidenav-user-settings"]').click();
    }
    inputFirstName(userData) {
        return cy.get("#user-settings-firstName-input");
    }
    inputLastName(userData) {
        return cy.get("#user-settings-lastName-input");
    }
    checkUserBalance() {
        return cy.get('[data-test="sidenav-user-balance"]');
    }
}
export default AccountDetails;
