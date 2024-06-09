describe('Tests for product page', () => { 
    it('Show products exists on homepage', () => { 
        cy.visit('/'); 

        cy.getBySel('product-home').each(() => {
            // Check if essential elements for each product on the homepage exist
            cy.getBySel('product-home-img').should('exist')
            cy.getBySel('product-home-name').should('exist') 
            cy.getBySel('product-home-ingredients').should('exist') 
            cy.getBySel('product-home-link').should('exist') 
            cy.getBySel('product-home-price').should('exist') 

            let k = 0 // Initialize a counter variable

            // For each product link, click on it and perform assertions on the detail page
            cy.getBySel('product-home-link').each(($button) => {
                $button.click() 
                k += 1 // Increment the counter for each product clicked
            }).then(() => {
                cy.getBySel('detail-product-img').should('exist') 
                cy.getBySel('detail-product-name').should('exist') 
                cy.getBySel('detail-product-description').should('exist') 
                cy.getBySel('detail-product-skin').should('exist') 
                cy.getBySel('detail-product-aromas').should('exist') 
                cy.getBySel('detail-product-ingredients').should('exist') 
                cy.getBySel('detail-product-price').should('exist') 
                cy.getBySel('detail-product-stock').should('exist') 
                cy.getBySel('detail-product-add').should('exist') 
                cy.getBySel('detail-product-quantity').should('exist') 
                cy.go('back') 
            })
        })
    })
})
