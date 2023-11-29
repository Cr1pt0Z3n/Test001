describe("User Search", () => {

    beforeEach("Preconditions", () => {
        cy.session("Login", () => {
            cy.login(Cypress.env("email"), Cypress.env("password")).wait(5000);
        });
    });

    it("Search by Name - Click First Result", () => {
        const searchTerm = "Joyline";
        const searchMatch = "Laura"

        cy.visit("/Pool").wait(4000);

        // Type the search term in the search bar
        cy.get('.search-bar .form-control').should('exist').type(searchTerm);

        // Intercept API call for search-paginated-users
        cy.intercept('POST', "https://api-qa.carpedmdating.com/api/User/search-paginated-users").as('paginatedUsers');

        // Wait for the search results to load
        cy.wait('@paginatedUsers');

        // Click on the image of the first result
        cy.get('.wrap-avatar-name > .MuiAvatar-root > .MuiAvatar-img').click();

        cy.get('#simple-tab-2 > .MuiTab-wrapper').click();

        cy.get('.mci-matchmaker-button').click();

        cy.get('.search-bar .form-control').should('exist').type(searchMatch);

        cy.get('.wrap-avatar-name > .MuiAvatar-root > .MuiAvatar-img').click();

        cy.get('.container-match-manually-button-card-member > .MuiButtonBase-root > .MuiButton-label').click();

        cy.get('.MuiButton-label').click();
    });
});