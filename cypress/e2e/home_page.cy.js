const email = "jge.lrothprueba@gmail.com"
const password = 'Aaa321321!'
const emailError = 'email_error@gmail.com'
const passwordError = 'password error'

let codeVerification 

describe('Loguin Flow', () => {

    it('comando de cypress OK', () =>{
      cy.login(email, password)
    })

    it('comando de cypress NOK', () =>{
      cy.login(emailError, password)
    })

    it('comando cypress NOK', () => {
      cy.login(email, passwordError)
    })

  })