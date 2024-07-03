import { faker } from "@faker-js/faker"

const fakerNegativeStock = faker.datatype.number({ min: -10, max: -1 }).toString()
const fakerStockSup20 = faker.datatype.number({ min: 20, max: 400 }).toString()
const apiUrl = Cypress.env("apiUrl")
const apiOrders = `${Cypress.env("apiUrl")}/orders`
const apiUpdateQuantity = `${Cypress.env("apiUrl")}/orders`
let token // Define token variable

describe("Cart tests", () => {
	beforeEach(() => {
		cy.clearCookies()
		cy.clearLocalStorage()

		// Visit the login page
		cy.visit("/")
		cy.getBySel("nav-link-login").click()

		// Verify the URL contains /login
		cy.url().should("include", "/login")

		// Ensure the login form is visible and fill it
		cy.getBySel("login-input-username", { timeout: 20000 })
			.should("be.visible")
			.type(Cypress.env("username"))
		cy.getBySel("login-input-password", { timeout: 20000 })
			.should("be.visible")
			.type(Cypress.env("password"))
		cy.getBySel("login-submit", { timeout: 20000 }).should("be.visible").click()

		// Verify login success by checking the URL doesn't contain /login
		cy.url().should("not.include", "/login") // Assuming successful login redirects
		cy.contains("Mon panier", { timeout: 20000 }).should("be.visible")

		// Get and store the token
		cy.getToken().then(retrievedToken => {
			token = retrievedToken
		})
	})

	it("Add products not available in stock to cart and check stock", () => {
		cy.visit("http://localhost:8080/#/products/3")

		cy.getBySel("detail-product-stock")
			.invoke("text")
			.should("match", /(0|[1-9][0-9]*) en stock$/)
			.then(text => {
				const stock = text.trim()
				const quantityStock = parseInt(stock.match(/^-?\d+/)[0])
				cy.log(`stock initial : ${quantityStock}`)

				if (quantityStock <= 1) {
					throw new Error("can not add to cart because stock not enough")
				} else {
					cy.getBySel("detail-product-add").click()
					cy.get("#cart-content").should("exist")
					cy.go("back")
					const newQuantityStock = quantityStock - 1
					cy.getBySel("detail-product-stock")
						.invoke("text")
						.should("match", new RegExp(`^${newQuantityStock} en stock$`))
					cy.log(`stock after add to cart : ${newQuantityStock}`)

					cy.visit("http://localhost:8080/#/cart")
					cy.getBySel("cart-line-delete").click({ multiple: true })
				}
			})
	})

	it("Add products available in stock to cart and check stock", () => {
		cy.visit("http://localhost:8080/#/products/4")

		cy.getBySel("detail-product-stock")
			.invoke("text")
			.should("match", /(0|[1-9][0-9]*) en stock$/)
			.then(text => {
				const stock = text.trim()
				const quantityStock = parseInt(stock.match(/^-?\d+/)[0])
				cy.log(`stock initial : ${quantityStock}`)

				if (quantityStock <= 1) {
					throw new Error("can not add to cart because stock not enough")
				} else {
					cy.getBySel("detail-product-add").click()
					cy.get("#cart-content").should("exist")
					cy.go("back")
					const newQuantityStock = quantityStock - 1
					cy.getBySel("detail-product-stock")
						.invoke("text")
						.should("match", new RegExp(`^${newQuantityStock} en stock$`))
					cy.log(`stock after add to cart : ${newQuantityStock}`)

					cy.visit("http://localhost:8080/#/cart")
					cy.getBySel("cart-line-delete").click({ multiple: true })
				}
			})
	})

	it("Check limit with negative quantity", () => {
		cy.visit("http://localhost:8080/#/products")

		cy.getBySel("product-link").then(link => {
			const nbProduct = Cypress.$(link).length
			cy.getBySel("product-link")
				.should("have.length", nbProduct)
				.its("length")
				.then(n => Cypress._.random(0, n - 1))
				.then(k => {
					cy.getBySel("product-link").eq(k).click({ force: true })
					cy.getBySel("detail-product-quantity").clear()
					cy.getBySel("detail-product-quantity").type(fakerNegativeStock)
					cy.getBySel("detail-product-form").should("have.class", "ng-invalid")
					cy.getBySel("detail-product-form").should("not.have.class", "ng-valid")
				})
		})
	})

	it("Check limit with positive quantity greater than 20", () => {
		cy.visit("http://localhost:8080/#/products")

		cy.getBySel("product-link").then(link => {
			const nbProduct = Cypress.$(link).length
			cy.getBySel("product-link")
				.should("have.length", nbProduct)
				.its("length")
				.then(n => Cypress._.random(0, n - 1))
				.then(k => {
					cy.getBySel("product-link").eq(k).click({ force: true })
					cy.getBySel("detail-product-quantity").clear()
					cy.getBySel("detail-product-quantity").type(fakerStockSup20)
					cy.getBySel("detail-product-form").should("have.class", "ng-valid")
					cy.getBySel("detail-product-form").should("not.have.class", "ng-invalid")

				})
		})
	})

	it("Should add a product to the cart and show up in the API", () => {
		let Productid;
	
		// Navigate to the first product detail page
		cy.getBySel("product-home-link", { timeout: 20000 })
		  .should('be.visible')
		  .first()
		  .click();
	
		cy.url().then(url => {
			const segments = url.split("/");
			Productid = parseInt(segments[segments.length - 1]);
			cy.log(`Product ID: ${Productid}`);
	
			// Add the product to the cart
			cy.wait(2000);  // Check the page has fully loaded
			cy.getBySel("detail-product-add").click();
	
			// Verify the product is added to the cart via API
			cy.wait(2000);  // Wait for the cart API to reflect the new addition
	
			cy.getToken().then(token => {
				cy.request({
					method: "GET",
					url: apiUrl + "/orders",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then(response => {
					cy.log(JSON.stringify(response.body));
	
					const orderLines = response.body.orderLines;
					const productInCart = orderLines.find(orderLine => orderLine.product.id === Productid);
	
					// Check if the product is in the cart
					expect(productInCart).to.not.be.undefined;
					expect(productInCart.product.id).to.equal(Productid);
				});
			});
		});
	
		cy.visit("/cart");
	
		// Check the cart contains items before attempting to delete
		cy.get('body').then($body => {
			if ($body.find("[data-cy=cart-line-delete]").length > 0) {
				cy.getBySel("cart-line-delete", { timeout: 20000 })
				  .should('be.visible')
				  .click({ multiple: true });
			} else {
				cy.log('No items in the cart to delete');
			}
		});
	});
	
	
	

	it("Change product quantity", () => {
		let idCart;
	
		// Retrieve the cart ID first
		cy.getToken().then(token => {
			cy.request({
				method: "GET",
				url: apiUrl + "/orders",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then(response => {
				cy.log('Orders response:', response.body);
	
				// Check the response has the expected structure and data
				if (response.body && response.body.length > 0) {
					idCart = response.body[0].id; // 
					cy.log(`Cart ID: ${idCart}`);
	
					// Proceed to change the quantity now that we have a valid cart ID
					cy.request({
						method: "PUT",
						url: apiUpdateQuantity + `/${idCart}/change-quantity`,
						headers: {
							Authorization: `Bearer ${token}`,
						},
						body: {
							quantity: 2,
						},
					}).then(response => {
						cy.log('Change quantity response:', response);
						expect(response.status).to.eq(200);
					});
				} else {
					throw new Error("No orders found in response");
				}
			});
		});
	});
	
	});	
