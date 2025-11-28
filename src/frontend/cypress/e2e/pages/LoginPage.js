export class LoginPage {
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        submitBtn: () => cy.get('button').contains('Login'),
        usernameError: () => cy.get('label[name="username-error"]'),
        passwordError: () => cy.get('label[name="password-error"]'),
    }

    navigate() {
        cy.visit('/');
    }

    typeUsername(username) {
        this.elements.usernameInput().clear().type(username);
    }
    typePassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    clickLogin() {
        this.elements.submitBtn().click();
    }

    getUsernameError()
    {
        return this.elements.usernameError();
    }

    getPasswordError()
    {
        return this.elements.passwordError();
    }
}
