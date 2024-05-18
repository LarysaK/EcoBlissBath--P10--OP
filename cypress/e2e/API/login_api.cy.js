describe("Test api login", () => {
    it("Returns a 401 error for an unknown user", () => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/login`,
        body: {
          username: "fakeuser@gmail.com",
          password: "fake-password",
        },
        // Don't fail the test if the status code is not 200
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });

    // Send a POST request to the login endpoint with correct credentials
    it("Returns a status code 200 for a known user", () => {
      
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/login`,
        body: {
          username: "test2@test.fr",
          password: "testtest",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      
    });
  });
  