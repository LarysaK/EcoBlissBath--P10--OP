describe("Panier / Order access without authorization", () => {
  it("401 error", () => {
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

// Test NOK! Internal Server Error 500, to check this when the dev will resolve the problem
// describe("Panier / Order access without authorization", () => {
// it('error 403', () => {    
//   cy.request({
//       method: "POST",
//       url: `${Cypress.env("apiUrl")}/orders`,
//       headers: {
//           Authorization : "",
//       },
//       body: {
//           "product": 3,
//           "quantity": 3,
//       },
//       failOnStatusCode: true 
//     }).then((response) => {
//       expect(response.status).to.eq(403)
//       cy.log(JSON.stringify(response.body))
//     });
// });
// });


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
