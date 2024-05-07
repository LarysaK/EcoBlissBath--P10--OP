describe('connect page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/login');
    });
  
    it('login form', () => {
      cy.get('[data-cy="login-input-username"]').type('test2@test.fr')
      cy.get('[data-cy="login-input-password"]').type('testtest')
      cy.get('[data-cy="login-submit"]').click()
    })
});

describe('Add Button Present in Product Card', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/products/3');
    });

    it('should display "ajouter au panier" button', () => { 
        cy.get('[data-cy="detail-product-add"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('exist')
      });


    // Shouls I follow the logic? Do I have to go through the products page??
    // it('Clicks the "Consulter" button and checks the URL', () => { 
    //   cy.get('[data-cy="product-link"]').click();
    //   cy.url().should('include', '/products/3');
    // });
  
    // it('should display "ajouter au panier" button', () => { 
    //   // Click all elements matching the selector
    //   cy.get('[data-cy="detail-product-add"]').click({ multiple: true });

    //   // Assert that at least one button was clicked
    //   cy.get('[data-cy="detail-product-stock"]').should('exist');
    // });
});

