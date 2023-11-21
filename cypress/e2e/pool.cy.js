
// const status = ["SUBMITTED", "HOLD"]

describe("pool admin", ()=>{

    beforeEach("Pre conditions",()=>{
        cy.session("Login", ()=>{
            cy.login(Cypress.env("email"), Cypress.env("password")).wait(5000)
        })
    })

    it("Primary Filters, SUBMITTED", ()=>{
        cy.visit("/Pool").wait(3000)
        cy.intercept('POST', "https://api-qa.carpedmdating.com/api/User/search-paginated-users").as('paginatedUsers')
        cy.get("[name='SUBMITTED']").click()
        cy.wait('@paginatedUsers').then((interceptedRequest) => {
            cy.log(interceptedRequest.response.body.result)
        })

    })

    it("Primary Filters, HOLD", ()=>{
        cy.visit("/Pool").wait(3000)
        cy.intercept('POST', "https://api-qa.carpedmdating.com/api/User/search-paginated-users").as('paginatedUsers')
        cy.get("[name='HOLD']").click()
        cy.wait('@paginatedUsers').then((interceptedRequest) => {
            cy.log(interceptedRequest.response.body.result)
        })
    })
})