// command to not repeat the data-cy selector in HTML

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
  });
  
// command to not repeat the login

  Cypress.Commands.add("login", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.visit("http://localhost:8080/#/");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.getBySel("nav-link-cart").should("exist");
  });
  
  

