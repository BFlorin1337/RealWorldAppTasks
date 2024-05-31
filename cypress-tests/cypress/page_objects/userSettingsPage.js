class UserSettingsPage {
    clickUserSettings() {
        cy.get('[data-test="sidenav-user-settings"]').click();
    }
    fillEmail(email) {
        cy.get("#user-settings-email-input").clear().type(email);
    }
    fillPhoneNumber(phoneNumber) {
        cy.get("#user-settings-phoneNumber-input").clear().type(phoneNumber);
    }
    submit() {
        cy.get('[data-test="user-settings-submit"]').click();
    }
    verifyUserSettings(firstName, lastName, email, phoneNumber) {
        cy.get("#user-settings-firstName-input").should("have.value", firstName);
        cy.get("#user-settings-lastName-input").should("have.value", lastName);
        cy.get("#user-settings-email-input").should("have.value", email);
        cy.get("#user-settings-phoneNumber-input").should("have.value", phoneNumber);
    }
}
export default UserSettingsPage