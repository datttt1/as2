import { ProductPage } from "./pages/ProductPage";

const productPage = new ProductPage();

describe("Product E2E Tests", () => {
  beforeEach(() => {
    cy.viewport(1600,900);
    cy.intercept("GET", "**/api/category").as("getCategories");
    cy.intercept("GET", "**/api/product").as("getProducts");
    cy.intercept("POST", "**/api/product").as("createProduct");
    cy.intercept("PUT", "**/api/product/update").as("updateProduct");
    cy.intercept("DELETE", "**/api/product/delete/*").as("deleteProduct");

    cy.clearLocalStorage();
    productPage.navigateProductList();


    cy.wait("@getProducts");
    cy.wait("@getCategories");
  });

  it("Should create a new product successfully", () => {


    productPage.clickCreateBtn();

    cy.url().should("contain", "/products/form");

    productPage.fillProductForm({
      name: "Test Product",
      description: "This is a test product",
      price: "99",
      quantity: "10",
      category: "Điện thoại"
    });

    productPage.submitProductForm();


    productPage.getProductInList("Test Product").should("be.visible");

    productPage.getMessage().should("contain", "Created product successfully");

  });

  it("Should update a product successfully", () => {

    productPage.clickEditBtn("Test Product");

    cy.url().should("contain", "/products/form");

    cy.get('input[id="name"]').should("have.value", "Test Product");
    cy.get('input[id="price"]').should("have.value", "99");
    cy.get('input[id="quantity"]').should("have.value", "10");
    cy.get('textarea[id="description"]').should("have.value", "This is a test product");
    cy.get('[data-testid="category-input"]').should("have.value", "Điện thoại");

    productPage.fillProductForm({ name: "Updated Test Product" });

    productPage.submitProductForm();
    cy.wait("@updateProduct");

    cy.url().should("contain", "/products");

    productPage.getProductInList("Updated Test Product").should("be.visible");
    productPage.getMessage().should("contain", "Updated product successfully");
  });


  it("Should show Product Detail", () => {

    productPage.getProductInList("Updated Test Product").click();

    cy.url().should("contain", "/products/detail");

    cy.get("p[data-testid='product-name']").should("contain", "Updated Test Product");
    cy.get("p[data-testid='product-description']").should("contain", "This is a test product");
    cy.get("p[data-testid='product-price']").should("contain", "99");
    cy.get("p[data-testid='product-quantity']").should("contain", "10");
    cy.get("p[data-testid='product-category']").should("contain", "Điện thoại");
  })


  it("Should delete a product successfully", () => {

    productPage.clickDeleteBtn("Updated Test Product");
    cy.wait("@deleteProduct");

    productPage.getProductInList("Updated Test Product").should("not.exist");
    productPage.getMessage().should("contain", "Deleted product successfully");

  });

})