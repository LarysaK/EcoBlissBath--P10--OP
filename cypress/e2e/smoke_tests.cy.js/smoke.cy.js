describe("Smoke Test Suite", () => {
  it("Verify presence of login fields and buttons", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click(); 
    cy.getBySel("login-input-username").should("be.visible");
    cy.getBySel("login-input-password").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
  });

  it("Verify presence of 'Add to Cart' and product availability after successful login", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.contains("Mon panier").should("be.visible"); 

    // Select product"
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(3).should("contain", "Consulter").click();

    // Check presence of "Ajouter au panier" button
    cy.getBySel("detail-product-add").should("be.visible");
    cy.getBySel("detail-product-stock").should("be.visible");
  });

  it('Check stock and report a good number ', () => {
    cy.visit("")
    cy.getBySel('product-home-link').first().click()
    cy.getBySel('detail-product-stock').invoke('text').should('match', /^(0|[1-9][0-9]*) en stock$/)
})

});
