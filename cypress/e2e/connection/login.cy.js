describe('connect page', () => {
    it('login form', () => {
      cy.visit('http://localhost:8080/#/login')
      cy.get('[data-cy="login-input-username]').type('test2@test.fr')
      cy.get('[data-cy="login-input-password]').type('testtest')
      cy.get('[data-cy="login-submit"]').click()
    })
  })