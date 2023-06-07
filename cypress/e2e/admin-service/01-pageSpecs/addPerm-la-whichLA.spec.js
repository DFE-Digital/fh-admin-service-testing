describe('addPerm-la-whichLA.spec - FHG-3386 DFE - add permissions -Which local authority is the account for?',()=>{
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')

	})
    it('AC 1,3,5 - recognised text - list of valid LAs displayed in dropdown,back button',()=>{
        cy.pageHeadings().contains('Which local authority is the account for?')
        cy.whichLA('bristol')
        cy.contains("What's their email address?")
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        // back button - takes user to What do they need to do? page
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
    })
    it('AC 2 - unrecognised text /blank - no result found displayed in dropdown , error message',()=>{
        cy.pageHeadings().contains('Which local authority is the account for?')
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains('Select a local authority')
        cy.get('.govuk-error-summary').contains('Select a local authority')
        // unrecognised text 
        cy.get('#LaOrganisationName').type('xx')
        //No results found
        cy.get('ul#LaOrganisationName__listbox').contains('No results found')
        // user tries to contiue 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains('Select a local authority')
        cy.get('.govuk-error-summary').contains('Select a local authority')
       

    })
    it('error page back link',()=>{
        cy.pageHeadings().contains('Which local authority is the account for?')
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
         // back button - takes user to What do they need to do? page
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')

    })

})
