describe("Panier / Order access without authorization", () => {
  it("page 401 error", () => {
    // Send a request to the orders endpoint without providing authorization
    cy.request({
      url: `${Cypress.env("apiUrl")}/orders`,
      headers: {
        Authorization: "", 
      },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

// Error 403, c’est que vous n’avez pas les bons droits   ?????????????????????????????


// Adding an Available Product to the Cart
describe("Adding an available product to the cart", () => {
  it("Status 200 after adding a product to the cart", () => {
    // Log in to get an authentication token
    cy.request({
      method: "PUT",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr", 
        password: "testtest", 
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);

      // Extract the authentication token from the response
      const token = loginResponse.body.token;

      // Send a PUT request to add a product to the cart
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/orders/add`,
        body: {
          product: "6", 
          quantity: 1, 
        },
        headers: {
          // Include the authentication token in the request headers
          Authorization: `Bearer ${token}`, 
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});



// Ajouter un produit en rupture de stock : http://localhost:8081/orders/add  ????????????????????????????