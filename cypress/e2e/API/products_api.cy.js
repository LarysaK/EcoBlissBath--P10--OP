describe("Test API for Products ", () => {
  const apiProduct = `${Cypress.env("apiUrl")}/products`;

    it("GET products list", () => {
      cy.request("GET", apiProduct).then((response) => {
        expect(response.status).to.eq(200);
        // Check if the length is greater than 7, by changing beyond 8 there is an error because 8 items
        expect(response.body.length).to.be.greaterThan(7);
      });
    });

    it("GET product by ID  ", () => {
      const productId = "4";
      cy.request("GET", `${apiProduct}/${productId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", parseInt(productId)); 
        const productDetails = response.body;
        expect(productDetails.name).to.eq("Chuchotements d'été");
        expect(productDetails.skin).to.eq("Sèche");
        expect(productDetails.aromas).to.eq("Nature et végétal");
      });
    });
});
