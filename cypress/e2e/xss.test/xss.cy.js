describe("XSS Vulnerability Test", () => {
    it("Should not allow malicious script injection in reviews", () => {
        cy.visit('/');
        cy.getBySel("nav-link-login").click();
        cy.getBySel("login-input-username").type("test2@test.fr");
        cy.getBySel("login-input-password").type("testtest");
        cy.getBySel("login-submit").click();
        cy.getBySel("nav-link-reviews").should('be.visible');

        // Navigate to the reviews section
        cy.getBySel("nav-link-reviews").click();

        // Attempt to inject a malicious script in the review form
        const xssScript = "<script>alert('XSS attack!')</script>";
        cy.getBySel("review-input-title").type("XSS injection test");
        cy.getBySel("review-input-comment").type(xssScript);
        cy.getBySel("review-submit").click();

        // Verify that the review was submitted but the script was not executed
        cy.getBySel("review-title").should("contain", "XSS injection test");
        cy.getBySel("review-comment").then(($el) => {
            // Check if the element contains the XSS script
            if ($el.html().includes(xssScript)) {
                throw new Error('XSS vulnerability detected! The script was executed.');
            } else {
                // If the script is not present, the test should pass
                cy.wrap($el).should("not.contain.html", xssScript);
            }
        });
    });
});
