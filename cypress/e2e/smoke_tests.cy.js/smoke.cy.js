
describe("Smoke Test Suite", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/#/");
    });
  
    it("Verify presence of login fields and buttons", () => {
      cy.getBySel("nav-link-login").click();
      cy.getBySel("login-input-username").should("be.visible");
      cy.getBySel("login-input-password").should("be.visible");
      cy.getBySel("login-submit").should("be.visible");
    });
  
    it("Verify presence of 'Add to Cart' and product availability after successful login", () => {
      cy.login();  
      cy.getBySel("nav-link-products").click();
      cy.get("button").eq(3).should("contain", "Consulter").click();
  
      cy.getBySel("detail-product-add").should("exist");
      cy.getBySel("detail-product-stock").should("exist");
    });
  
    it("Verify successful login using custom command", () => {
      cy.login();
      cy.getBySel("nav-link-cart").should("exist");
    });
  });
  