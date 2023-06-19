describe("addPerm-checkAnswerPage - FHG-3391 DFE - add permissions - check account details page", {tags: ['addPerOnly']},()=>{
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.whichLA('bristol')
        cy.email('abc@def.com')
        cy.fullName('John Smith')
	})
  it('AC 1,4 - validate page content , back link ',()=>{
    
    cy.contains('Check account details')
    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
  })
})