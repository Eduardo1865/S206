describe('Testes no site saucedemo.com', () => {
  it('Fazer uma compra com o standard_user', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    let info = criarPessoa()
    cy.get('[data-test="firstName"]').type(info[0])
    cy.get('[data-test="lastName"]').type(info[1])
    cy.get('[data-test="postalCode"]').type(info[2])
    cy.get('[data-test="continue"]').click() 
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="complete-header"]').should("contain.text","Thank you for your order!")

  })

  it('Usuario banido não deve conseguir fazer login', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should("contain.text","Epic sadface: Sorry, this user has been locked out.")

  })

  it('Erro onde o usuario não consegue fazer ordenação que não seja por ordem alfabetica', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('error_user')
    cy.get('[data-test="password"]').type('secret_sauce')   
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="product-sort-container"]').select("Name (Z to A)")
    cy.get('[data-test="product-sort-container"]')
      .find(':selected')
      .should("have.text", "Name (A to Z)")
    cy.get('[data-test="product-sort-container"]').select("Price (low to high)")
    cy.get('[data-test="product-sort-container"]')
      .find(':selected')
      .should("have.text", "Name (A to Z)")
    cy.get('[data-test="product-sort-container"]').select("Price (high to low)")
    cy.get('[data-test="product-sort-container"]')
      .find(':selected')
      .should("have.text", "Name (A to Z)")
  })
})



function criarPessoa() {
let hora = new Date().getHours().toString()
let minuto = new Date().getMinutes().toString()
let seg = new Date().getSeconds().toString()
let first = hora + minuto + seg + "nome1" 
let last = hora + minuto + seg + "nome2" 
let zip = hora + minuto + seg + 1 
let info = [first, last, zip]

return info
}