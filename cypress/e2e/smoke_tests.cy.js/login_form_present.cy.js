describe('Form Elements Presence', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/login');
    });
  
    it('should display username and password fields', () => {
      cy.get('[data-cy=login-input-username]').should('exist');
      cy.get('[data-cy=login-input-password]').should('exist');
    });
  
    it('should display login button', () => {
      cy.get('[data-cy=login-submit]').should('exist').contains('Se connecter');
    });
  
    it('should display registration link', () => {
      cy.get('.login-register .content-login p.text-center').should('exist');
    });
  });