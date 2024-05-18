describe("Adding a Review", () => {
    let token; // Declaring a variable to store the authentication token
  
    it("Login and Retrieve Token", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("apiUrl") + "/login",
        body: {
          username: "test2@test.fr",
          password: "testtest",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
  
        // Store the token for later use
        token = response.body.token;
      });
    });
  
    it("Add a Review with Valid Token", () => {
      cy.login(); // a custom command for logging in
      cy.request({
        method: "POST",
        url: Cypress.env("apiUrl") + "/reviews",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: {
          title: "Test adding a review with token",
          comment: "Test comment with token",
          rating: "5",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it("Add a Review without Authentication", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("apiUrl") + "/reviews",
        body: {
          title: "Test adding a review without authentication",
          comment: "Test comment without authentication",
          rating: "0",
        },
        // Allow the test to continue even if request fails
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
  