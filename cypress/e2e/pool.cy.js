const email = "cuentatest123321cuentates.t@gmail.com"
const password = 'Test123#'

// const status = ["SUBMITTED", "PAID", "BCKCOMPLETED"]

describe("pool admin", ()=>{

    beforeEach("Pre conditions",()=>{
        cy.session("Login", ()=>{
            cy.login(email, password).wait(5000)
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