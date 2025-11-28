import { LoginPage } from './pages/LoginPage';

const loginPage = new LoginPage();

describe("Login E2E Tests", () => {
    beforeEach(() => {
        cy.intercept("POST", "/api/auth/login").as("login");
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

        loginPage.typeUsername("testuser");
        loginPage.typePassword("testuser123");

        loginPage.clickLogin();

        loginPage.getUsernameError({ timeout: 10000 }).should('have.length', 0)
        loginPage.getPasswordError({ timeout: 10000 }).should('have.length', 0)

        cy.wait("@login").its("response.statusCode").should("eq", 200);


        cy.url().should('contain', '/products');
    });

    it("should display error messages for invalid credentials", () => {

        loginPage.typeUsername("a");
        loginPage.typePassword("abc");

        loginPage.clickLogin();

        loginPage.getUsernameError().should('have.length.greaterThan', 0)
        loginPage.getPasswordError().should('have.length.greaterThan', 0)
    })
});
