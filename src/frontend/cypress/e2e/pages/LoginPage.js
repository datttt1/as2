export class LoginPage {
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        submitBtn: () => cy.get('button').contains('Login'),
        usernameError: () => cy.get('label[data-testid="username-error"]'),
        passwordError: () => cy.get('label[data-testid="password-error"]'),
    }

    navigate() {
        cy.visit('http://localhost:5173/');
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
