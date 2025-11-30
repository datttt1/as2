export class ProductPage{

    navigateProductList(){
        cy.visit('http://localhost:5173/products');
    }
    getProductRow(name){
        return cy.contains('td[data-testid="product-name"]',name).closest('tr');
    }
    clickCreateBtn(){
       cy.get('button').contains('+ New product').click();
    }

    clickDeleteBtn(name){
        this.getProductRow(name).find("button[aria-label='delete']").click();
    }

    clickEditBtn(name){
        this.getProductRow(name).find("button[aria-label='edit']").click();
    }

    fillProductForm({name, description, price, quantity, category}){
        if(name){
            cy.get('input[id="name"]').clear().type(name);
        }
        if(description){
            cy.get('textarea[id="description"]').clear().type(description);
        }
        if(price){
            cy.get('input[id="price"]').clear().type(price);
        }
        if(quantity){
            cy.get('input[id="quantity"]').clear().type(quantity);
        }
        if(category){
            cy.get('[data-testid="category-input"]').click();
            cy.get('[data-testid="category-popup"]').contains(category).click({force:true});
        }
    }
    submitProductForm(){
        cy.get('button[data-testid="submit-button"]').click();
    }

    getProductInList(name){
        return cy.get('td[data-testid="product-name"]').contains(name);
    }
    getMessage(){
        return cy.get('label[data-testid="message"]');
    }
}
export default ProductPage;