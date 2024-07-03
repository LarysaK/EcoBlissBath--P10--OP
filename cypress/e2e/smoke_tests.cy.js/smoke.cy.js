const username = Cypress.env("username")
const password = Cypress.env("password")

describe("Smoke Test Suite", () => {
  it("Verify presence of login fields and buttons", () => {
    cy.visit('/');
    cy.getBySel("nav-link-login").click(); 
    cy.getBySel("login-input-username").should("be.visible");
    cy.getBySel("login-input-password").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
  });

  it("Verify presence of 'Add to Cart' and product availability after successful login", () => {
    cy.visit('/');
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.contains("Mon panier",{timeout:300000}).should("be.visible"); 

    // Select product"
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(3).should("contain", "Consulter").click();

    // Check presence of "Ajouter au panier" button
    cy.getBySel("detail-product-add").should("be.visible");
    cy.getBySel("detail-product-stock").should("be.visible");
  });

  it('Check stock and report a good number ', () => {
    cy.visit("http://localhost:8080/#/products/5")
    cy.get('[data-cy="detail-product-stock"]').should('exist')
    cy.get('[data-cy="detail-product-quantity"]').should('exist')
    cy.getBySel('detail-product-stock').invoke('text').should('match', /^(0|[1-9][0-9]*) en stock$/)
})

});
