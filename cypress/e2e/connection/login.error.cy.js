describe('Login Form Error', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/login');
    });
  
    it('Login form invalid', () => {
      // Invalid credentials and attempt login
      cy.get('[data-cy=login-input-username]').type('invalid@test.fr');
      cy.get('[data-cy=login-input-password]').type('test');
      cy.get('[data-cy=login-submit]').click();
  
      // Verify if error message is displayed
      cy.get('[data-cy=login-errors]').should('exist').contains('Identifiants incorrects');
    });
  });
  