import { LoginPage } from './pages/LoginPage';

const loginPage = new LoginPage();

describe("Login E2E Tests", () => {
    beforeEach(() => {
        cy.intercept("POST","**/api/auth/login").as("login");
        cy.clearLocalStorage();
        loginPage.navigate();
    });
    it("should render all components", () => {
        cy.get('p').contains('Flogin').should('be.visible');
        loginPage.elements.usernameInput().should('be.visible');
        loginPage.elements.passwordInput().should('be.visible');
        loginPage.elements.submitBtn().should('be.visible');
    })

    it("should login successfully with valid credentials", () => {

        loginPage.typeUsername("user1");
        loginPage.typePassword("user123");

        loginPage.clickLogin();
        cy.wait(0);
        loginPage.getUsernameError().should('not.be.visible')
        loginPage.getPasswordError().should('not.be.visible')

        cy.wait("@login",{timeout: 10000})

        cy.url().should('contain', '/products');

        cy.get('label[data-testid="message"]').should('contain', 'Login successful');
    });

    it("should display error messages for invalid credentials", () => {

        loginPage.typeUsername("a");
        loginPage.typePassword("abc");

        loginPage.clickLogin();

        loginPage.getUsernameError().should('have.length.greaterThan', 0)
        loginPage.getPasswordError().should('have.length.greaterThan', 0)
    })
});
