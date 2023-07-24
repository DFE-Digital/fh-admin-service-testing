describe('| addPerm-la-typeOfUserLA | FHG-3382 DFE - What do they need to do? page',()=>{
    beforeEach(()=> {
		cy.visit('/')
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
	})
    it('AC 1,2,5 -  validate content , LA - Add and manage services, family hubs and accounts - option, back button',()=>{
        cy.welcomePage( )
        cy.addPermissions()
        cy.typeOfUserPage('la')
        // What do they need to do? page 
        cy.typeOfUserLA('1')
        // which LA page
        cy.pageHeadings().contains('Which local authority do they work for?')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('[data-testid="LaManager"]').should('be.checked');

    })
    it('AC 3 - LA -  Make connection requests to voluntary and community sector services - option',()=>{
         cy.welcomePage( )
        cy.addPermissions()
        cy.typeOfUserPage('la')
        // What do they need to do? page 
        cy.typeOfUserLA('2')
       // which LA page
        cy.pageHeadings().contains('Which local authority do they work for?')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('#LaProfessional').should('be.checked');

    })
    it('AC 4 - LA - no selection - error message',()=>{
        cy.welcomePage( )
        cy.addPermissions()
        cy.typeOfUserPage('la')
       
        // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select what they need to do')
       // What do they need to do? page 
        cy.typeOfUserLA('2')
        // which LA page
        cy.pageHeadings().contains('Which local authority do they work for?')

    })
})