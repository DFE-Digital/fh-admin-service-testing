describe('FHG- 3382 DFE - What do they need to do? page',()=>{
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
	})
    it('AC 1,5 -  validate content , back button',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.get('#buttonContinue').click()
        // What do they need to do? page 
        cy.typeOfUserLA()

        // back link
        cy.get('.govuk-back-link').click()
        cy.typeOfUserPage()
        // previous page selection is retained 
        cy.get('[data-testid="role-for-organisation-type-la"]').should('be.checked');

    })
    it('AC 2 - LA - Add and manage services, family hubs and accounts - option',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.get('#buttonContinue').click()
        // What do they need to do? page 
        cy.typeOfUserLA('1')
        cy.get('#buttonContinue').click()
        // which LA page
        cy.whichLA()
        // back link
        cy.get('.govuk-back-link').click()
        cy.typeOfUserLA()
        // previous page selection is retained 
        cy.get('[data-testid="LaManager"]').should('be.checked');

    })
    it('AC 3 - LA -  Make connection requests to voluntary and community sector services - option',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.get('#buttonContinue').click()
        // What do they need to do? page 
        cy.typeOfUserLA('2')
        cy.get('#buttonContinue').click()
        // which LA page
        cy.whichLA()
        // back link
        cy.get('.govuk-back-link').click()
        cy.typeOfUserLA()
        // previous page selection is retained 
        cy.get('#LaProfessional').should('be.checked');

    })
    it('AC 4 - LA - no selection - error message',()=>{
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.get('#buttonContinue').click()
        
        // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select what they need to do')
       // What do they need to do? page 
        cy.typeOfUserLA('2')
        cy.get('#buttonContinue').click()
        // which LA page
        cy.whichLA()

    })
})