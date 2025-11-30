import { LoginPage } from './pages/LoginPage';

const loginPage = new LoginPage();

describe("Login E2E Tests", () => {
    beforeEach(() => {
        cy.intercept("POST","**/api/auth/login").as("login");
        cy.clearLocalStorage();
        loginPage.navigate();
    });
    it("Should render all components", () => {
        cy.get('p').contains('Flogin').should('be.visible');
        loginPage.elements.usernameInput().should('be.visible');
        loginPage.elements.passwordInput().should('be.visible');
        loginPage.elements.submitBtn().should('be.visible');
    })

    it("Should login successfully with valid credentials", () => {
loginPage.typeUsername("admin12");
        loginPage.typePassword("admin123");

        loginPage.clickLogin();

        loginPage.getUsernameError().should('not.be.visible')
        loginPage.getPasswordError().should('not.be.visible')

        cy.wait("@login",{timeout: 10000})

        cy.url().should('contain', '/products');
        
        cy.get('label[data-testid="message"]').should('contain', 'Login successful');
    });

    it("Should display error messages for invalid credentials", () => {

        loginPage.typeUsername("a");
        loginPage.typePassword("abc");

        loginPage.clickLogin();

        loginPage.getUsernameError().should('have.length.greaterThan', 0)
        loginPage.getPasswordError().should('have.length.greaterThan', 0)
    })

    it("Should login failed with wrong password",()=>{
        loginPage.typeUsername("admin12");
        loginPage.typePassword("admin12345");

        loginPage.clickLogin();
        cy.wait("@login");
        cy.on("window:alert",(text)=>{
            expect(text).to.equal("Wrong password");
        })
    })

    it("Should login failed with non-existent username", ()=>{
        loginPage.typeUsername("admin1");
        loginPage.typePassword("admin1235");

        loginPage.clickLogin();
        cy.wait("@login");
        cy.on("window:alert",(text)=>{
            expect(text).to.equal("Username not found");
        })
    })
});
