describe('FHG-1065 DFE - who are you adding permissions for? page',()=>{
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
	})
    it('AC 1,5 -  validate content',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage()
        // back link
        cy.get('.govuk-back-link').click()
        cy.welcomePage('Dfe Admin User')

    })
    it('AC 2  -  LA option',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.get('.govuk-button').click()
        cy.typeOfUserLA()
    })
    it('AC 3  -  VCS option',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.get('.govuk-button').click()
        cy.typeOfUserVCS()
    })
    it('AC 4  -  error message',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
       // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select who you are adding permissions for')
        //user makes a seletion
        cy.typeOfUserPage('la')
        cy.get('.govuk-button').click()
        cy.typeOfUserLA()

    })

})
describe('User not logged in - access page without logging in - error page',()=>{
    it('AC 6 - error page - not implemented',()=>{
        cy.visit('/AccountAdmin/TypeOfRole')
    })
   
})