context("Organisation Page", () => {

	it("can find search input and type github", () => {
		cy.visit('/');
		cy.get("[type=search]")
		.type("github")
		.should("have.value", "github");
	});

	it("can find search button and click it", () => {
		cy.get("button[type=submit]").click();
	});

	it("can find successfully loaded result with image and headline Github", () => {
		cy.get('.uk-placeholder').should('exist');
		cy.get('.uk-placeholder').find('img').should('exist');
		cy.get('.uk-placeholder').find('h4>span').should('have.text', "GitHub");
	});

	it("can find Not Found text when result is not positive", () => {
		cy.visit('/');
		cy.get("[type=search]")
		.type("gtta")
		.should("have.value", "gtta");
		cy.get("button[type=submit]").click();
		cy.get('.uk-placeholder').find('span').should('have.text', 'Not Found');
	});

	it("can find Not Found text when result is not positive", () => {
		cy.visit('/');
		cy.get("[type=search]")
		.type("gtta")
		.should("have.value", "gtta");
		cy.get("button[type=submit]").click();
		cy.get('.uk-placeholder').find('span').should('have.text', 'Not Found');
	});

	it("can click on found organisation and go to repository list route", () => {
		cy.visit('/');
		cy.get("[type=search]")
		.type("github")
		.should("have.value", "github");
		cy.get("button[type=submit]").click();
		cy.wait(1500);
		cy.get(".uk-placeholder").click();
		cy.location("pathname").should("include", "/github/repos");
	});
  });
