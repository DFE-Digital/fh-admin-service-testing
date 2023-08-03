describe('| addPerm-vcs-whichVcsOrg | FHG-3416 ,FHG-3754 DFE - add permissions - Which organisation do they work for?',()=>{
    // As a DFE Admin  creating an VCS account
    beforeEach(()=> {
		cy.visit('/')
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
       cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('both')
        cy.vcsWhichLA('redbridge')

	})
    it('AC 1,3,6 - recognised text - list of valid Organisations related to LA displayed in dropdown , back button,FHG-3754',()=>{
        cy.pageHeadings().contains('Which organisation do they work for?')
        cy.contains("Their organisation must be in the directory for it to appear here. If it's not, you can add an organisation.")
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        cy.contains('Which local authority area do they work in?')
        // happy path
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('Centre & CAMHS')
        //email page
        cy.contains("What's their email address?")
        // bug FHG-3754
        // go back validate if special characters are displayed correctly 
        cy.get('.govuk-back-link').click()
        cy.contains('The Grove Redbridge Child Development Centre & CAMHS')
        
    })
    it('AC 2 , 4 - unrecognised text / blank - no result found displayed in dropdown , error message',()=>{
        cy.pageHeadings().contains('Which organisation do they work for?')
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains('Select an organisation')
        cy.get('.govuk-error-summary').contains('Select an organisation')
        // unrecognised text 
        cy.get('#VcsOrganisationName').type('xx')
        //No results found
        cy.get('ul#VcsOrganisationName__listbox').contains('No results found')
        // user tries to contiue 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('[data-testid="errors-list"] > li').contains('Select an organisation')
        cy.get('.govuk-error-summary').contains('Select an organisation')
        cy.pageHeadings().contains('Which organisation do they work for?')
    })
    it('AC 5 - add organisation link - FHG-3443 - validate link exists and takes user to correct page',()=>{
        cy.pageHeadings().contains('Which organisation do they work for?')
        cy.get('.govuk-hint > a').click()
        cy.contains("What is the organisation's name?")
    })
    it('Error page back link',()=>{
       cy.pageHeadings().contains('Which organisation do they work for?')
        // user tries to contiue without making selection 
        cy.get('.govuk-button').click()
        // error message 
        cy.get('.govuk-error-summary').contains('There is a problem')
         // back button - takes user to What do they need to do? page
        cy.get('.govuk-back-link').click()
        cy.contains('Which local authority area do they work in?')
    })
})
