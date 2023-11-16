const URL_DE_TU_PAGINA = 'https://admin-qa.carpedmdating.com/login'
const URL_API =  'https://api-qa.carpedmdating.com/api'
const ENDPOINTS =  {
  GET_TEMP_CODE: `${URL_API}/Auth/get-tempcode` // template strings *``* '' "" 
}

describe('Login Flow: Failed', () => {
  it('should log in successfully', () => {
    // Visitar la página de inicio de sesión
    cy.visit(URL_DE_TU_PAGINA)
    // Llenar el campo Email
    cy.get('#email').type('tu_correo@example.com')
    // Llenar el campo Password
    cy.get('#password').type('tu_contraseña')
    // intercept request
    cy.intercept('POST', ENDPOINTS.GET_TEMP_CODE).as('getTempCode')
    // Hacer clic en el botón "Log In"
    cy.get('.login-submit-button').click()
    // wait request
    cy.wait('@getTempCode').its('response.body.authType').should('eq', 'Failed')
    // Comprobar popup con mensaje emergente
    cy.get('.modal-login-error-title').should('be.visible').and('contain', 'Cannot find any member by the Username and/or Password.')
    
    // cy.wait('@getTempCode').its('response.data.authType').should('eq', 'Failed')

    // Puedes agregar aserciones aquí para verificar que el inicio de sesión fue exitoso.
    // Por ejemplo, verificar que se redirige a la página correcta después del inicio de sesión.
  })
})


// Interceptamos la solicitud a la API externa
// cy.intercept('GET', 'https://api.externa.com/busqueda').as('solicitudBusqueda');

// Hacemos una acción que desencadene la solicitud de búsqueda
// cy.get('#boton-buscar').click();

// Esperamos a que se complete la solicitud
// cy.wait('@solicitudBusqueda').its('response.statusCode').should('eq', 500); // Supongamos que 500 representa un error en la API

// Realizamos aserciones en la aplicación en función de la respuesta de la solicitud de búsqueda
// cy.get('#mensaje-error').should('be.visible');


// debug

// cy.get('#elemento').its('text').then((text) => {
  // console.log('Texto obtenido:', text);
  // cy.debug()
  // Realiza más aserciones o acciones aquí si es necesario
// });