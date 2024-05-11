describe('connect page', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/');
  });

  it('login form', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr')
    cy.get('[data-cy="login-input-password"]').type('testtest')
    cy.get('[data-cy="login-submit"]').click()

    // After login, assert the presence of the basket link
     cy.get('[data-cy="nav-link-cart"]').should('be.visible').and('have.attr', 'href', '#/cart');
  })

  after( () => {
    cy.get('[data-cy="nav-link-logout"]').click({ multiple : true})
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })
})