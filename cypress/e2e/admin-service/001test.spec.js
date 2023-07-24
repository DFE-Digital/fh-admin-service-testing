describe('Login - Integration + One login',()=>{
     
    it('test ',()=>{
        cy.visit('/')
        cy.welcomePage()
        cy.get(':nth-child(2) > .govuk-header__link').contains('Sign out')
    })
})
