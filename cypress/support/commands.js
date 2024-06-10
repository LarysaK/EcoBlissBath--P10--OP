// Command to not repeat the data-cy selector in HTML

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

// Command to not repeat the login

Cypress.Commands.add('login', () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  cy.visit("/");
  cy.getBySel('login-input-username').type(username);
  cy.getBySel('login-input-password').type(password);
  cy.getBySel('login-submit').click();

  // Verify login success
   cy.url().should('not.include', '/login'); // Assuming successful login redirects
});

Cypress.Commands.add('getToken', () => {
  return cy.request({
    method: 'POST',
    url: apiUrl + '/',
    body: {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    },
  }).then((response) => {
    return response.body.token;
  });
});
 
  

