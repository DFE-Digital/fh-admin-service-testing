describe('| addPerm-vcs-typeOfUserVCS | FHG-3412 DFE - What do they need to do? page',{tags: ['dfeAdmin']},()=>{
    beforeEach(()=> {
		cy.visit('/')
       cy.integrationLogin('dfeadmin')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
	})
    it('AC 1,2,6 - validate content ,VCS- Add and manage services, family hubs and accounts - option, back button',()=>{
        
        // What do they need to do? page 
        cy.typeOfUserVCS('1')
        // whichVCSpage
        cy.pageHeadings().contains('Which local authority area do they work in?')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('[data-testid="VcsManager"]').should('be.checked');
    })
    it('AC 3 - VCS -  View and respond to connection requests - option',()=>{
        // What do they need to do? page 
        cy.typeOfUserVCS('2')
       // whichVCSpage
        cy.pageHeadings().contains('Which local authority area do they work in?')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('#VcsProfessional').should('be.checked');
    })
    it('AC 4,5 - VCS - no selection, error message, select both to continue',()=>{
       
        // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select what they need to do')
       // What do they need to do? page 
         cy.typeOfUserVCS('both')
        // which LA page
        cy.pageHeadings().contains('Which local authority area do they work in?')
         // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('#VcsProfessional').should('be.checked');
        cy.get('[data-testid="VcsManager"]').should('be.checked');
    })
    
})
