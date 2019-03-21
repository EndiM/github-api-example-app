context("Repositories Page", () => {

	beforeEach(() => {
		cy.visit('/github/repos');
	});

	it("can successfuly load /github/repos", () => {
		cy.visit('/github/repos');
		cy.wait(500);
	});

	describe('Breadcrumbs section', () => {
		it("can find ul element with .uk-breadcrumb class", () => {
			cy.get("ul.uk-breadcrumb").should('exist');
		});
		it("back element should lead to organisation page", () => {
			cy.get("ul.uk-breadcrumb").within(() => {
				cy.get("span").first().click({ force: true });
				cy.wait(500);
				cy.location("pathname").should("include", "/");
			});
		});
		it("should contain github link as an element", () => {
			cy.get("ul.uk-breadcrumb").within(() => {
				cy.get("li").first().contains('github');
				cy.get("li").first().find('a').should('have.attr', 'href', '/github/repos');
			});
		});
		it("should contain repos text as last element of breadcrumb", () => {
			cy.get("ul.uk-breadcrumb").within(() => {
				cy.get("li").last().contains('repos');
			});
		});
	});
});
