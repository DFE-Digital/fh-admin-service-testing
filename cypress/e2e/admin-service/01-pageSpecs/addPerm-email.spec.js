describe('addPerm-email - FHG-3387 DFE - add permissions - What is their email address?', {tags: ['addPerOnly']},()=>{
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

	})
    it('AC 1,4 Page content ,valid email address,back button',()=>{
        cy.email('abc@def.com')
        cy.contains("What is the user's full name?")
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        cy.whichLA('bristol')
    })
    it.only('AC 2,3 - no data entered , incorrect /invalid email address entered - error message',()=>{
        // error message when user does not enter any email address
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')
        // user enters invalid email address
        cy.email('abc@def')





        // // back button - takes user to LA page
        // cy.get('.govuk-back-link').click()



    })


})