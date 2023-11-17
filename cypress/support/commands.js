const SYSTEM_GUID = "d1e54e71-e486-4d85-96ad-fc2c2f07ca29"
const API = "https://api-qa.carpedmdating.com/api"

const endpoints = {
  'get-tempcode': '/Auth/get-tempcode',
  'code': '/User/code/' //{email}/{systemGuid}
}

let codeVerification

Cypress.Commands.add('login', (email, password) => {
  
  cy.visit('/login')
  cy.get('[placeholder="Email"]').click().type(email)
  cy.get('[placeholder="Password"]').click().type(password)

  //Declaro la intercepcion a realizar y creo un alias
  cy.intercept('POST', API + endpoints["get-tempcode"]).as('getTempCode')

  //Accion que dispara la solicitud
  cy.get('.login-submit-button').click()

  //Espero que se complete la solicitud interceptada y hago uso del objecto -> interception
  cy.wait('@getTempCode').then((interceptedRequest) => {
    if (interceptedRequest.response.body.authType === 'Success') {
        //Solicitud GET para obtener el code-verification
        cy.request('GET', API + endpoints.code + email + '/' + SYSTEM_GUID).then((response) => {
          expect(response.body)
          codeVerification = response.body

          //Ingreso el codigo de verificacion para validar el login
          cy.get('[placeholder="Enter Code"]').type(codeVerification)
          //Boton de Login
          cy.get('.login-screen-enter-code').click()
          cy.log('Login ✅ OK')
        })
    }
    else{
      cy.log('Login NOK ❌')
    }
  })
})