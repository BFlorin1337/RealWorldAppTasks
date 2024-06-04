class UserSettingsPage {
    get userSettingsButton() {
        return cy.get('[data-test="sidenav-user-settings"]');
    }
    get emailInput() {
        return cy.get("#user-settings-email-input");
    }
    get phoneNumberInput() {
        return cy.get("#user-settings-phoneNumber-input");
    }
    get submitButton() {
        return cy.get('[data-test="user-settings-submit"]');
    }
    clickUserSettings() {
        this.userSettingsButton.click();
    }
    fillEmail(email) {
        this.emailInput.clear().type(email);
    }
    fillPhoneNumber(phoneNumber) {
        this.phoneNumberInput.clear().type(phoneNumber);
    }
    submit() {
        this.submitButton.click();
    }
}
export default UserSettingsPage;
