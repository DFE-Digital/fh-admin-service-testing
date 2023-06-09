describe("| addPerm-vcs-AddOrg | FHG-3443 DFE - add permissions - What is the organisation's name?",()=>{
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('both')
        cy.vcsWhichLA('redbridge')

	})
    it('AC 1 ,2 - add vcs organisation linked to LA , back button',()=>{
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + ' VCS Organisation name')
        // back button - takes user to add organisation page
        cy.get('.govuk-back-link').click()
        cy.contains('What is the organisations name?')
        // back button - takes user to which organisation page
         cy.get('.govuk-back-link').click()
         cy.contains('Which organisation do they work for?')
    })
    it('AC 3 - blank - error message',()=>{
        cy.pageHeadings().contains('Which organisation do they work for?')
        cy.get('#add-organisation').click()
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains("Enter the organisation's name")
        cy.get('.govuk-error-summary').contains("Enter the organisation's name")
        // user is able to clear the message and progress 
        // add organisation name page
        cy.addOrgVcs(n + ' VCS Organisation name')
        cy.contains('Check details')
    })
    it('Error page back link',()=>{
       cy.pageHeadings().contains('Which organisation do they work for?')
        cy.get('#add-organisation').click()
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains("Enter the organisation's name")
        cy.get('.govuk-error-summary').contains("Enter the organisation's name")
         // back button - takes user to Which organisation do they work for? page
        cy.get('.govuk-back-link').click()
        cy.contains('Which organisation do they work for?')
    })
})
