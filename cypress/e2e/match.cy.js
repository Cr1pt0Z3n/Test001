describe("User Search", () => {
    const searchTerm = "Joyline";
    const searchMatch = "Laura";

    beforeEach("Preconditions", () => {
        cy.session("Login", () => {
            cy.login(Cypress.env("email"), Cypress.env("password")).wait(5000);
        });
    });

    it("Search by Name - Click First Result", () => {
        cy.visit("/Pool").wait(4000);

        // Type the search term in the search bar
        cy.getSearchBar().type(searchTerm);

        // Intercept API call for search-paginated-users
        cy.intercept('POST', "https://api-qa.carpedmdating.com/api/User/search-paginated-users").as('paginatedUsers');

        // Wait for the search results to load
        cy.wait('@paginatedUsers');

        // Click on the image of the first result
        cy.getFirstResult().click();

        cy.getTab('2').click();

        cy.get('.mci-matchmaker-button').click();

        cy.getSearchBar().type(searchMatch);

        cy.getFirstResult().click();

        cy.get('.container-match-manually-button-card-member > .MuiButtonBase-root > .MuiButton-label').click();

        cy.get('.MuiButton-label').click();
    });
});

// Custom commands
Cypress.Commands.add('getSearchBar', () => {
    return cy.get('.search-bar .form-control').should('exist');
});

Cypress.Commands.add('getFirstResult', () => {
    return cy.get('.wrap-avatar-name > .MuiAvatar-root > .MuiAvatar-img');
});

Cypress.Commands.add('getTab', (tabNumber) => {
    return cy.get(`#simple-tab-${tabNumber} > .MuiTab-wrapper`);
});