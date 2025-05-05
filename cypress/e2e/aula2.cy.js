/// <reference = cypress>

describe("Testes da criação, registro e login", ()=>{
  it.skip("Teste criação de usuário com sucesso", ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Eduardo")
    cy.get('#Text1').type("Augusto")
    cy.get('#username').type("Edu")
    cy.get('#password').type("123")
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text","Registration successful")
  })

  it.skip("Teste criação de usuário com falha", ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Eduardo")
    cy.get('#Text1').type("Augusto")
    cy.get('#username').type("Edu")
    cy.get('.btn-primary').should("be.disabled")
    
  })

  it.skip("Teste criação de login com sucesso", ()=>{
    let infos = criarUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text",infos[0])
  })

  it("Teste deletar login com sucesso", ()=>{
    let infos = criarUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text",infos[0])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text","Username or password is incorrect")
  })
})

function criarUser(){
  let hor = new Date().getHours().toString()
  let min = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let ID = hor + min + seg + "ID"
  let Senha = hor + min + seg + "Senha"
  let infos = [ID,Senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should("contain.text","Registration successful")
  return infos
}