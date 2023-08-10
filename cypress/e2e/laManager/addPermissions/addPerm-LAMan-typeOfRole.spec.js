describe('| addPerm-LAMan-typeOfRole.spec | FHG-3870 LA manager - Who are you adding permissions for?',{tags: ['LAMan']},()=>{
     beforeEach(() => {
        cy.visit('/')    
        cy.integrationLogin('laman')   
    })

    

    it('AC 1,2,5 - LA manager - LA route - validate content Someone who works for London Borough of Redbridge , back button',()=>{
        cy.visit('/')
       
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge','la')
        // What do they need to do? page 
        cy.typeOfUserLA('1')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
        // previous page selection is retained 
        cy.get('[data-testid="LaManager"]').should('be.checked');
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Who are you adding permissions for?')
         // back link
        cy.get('.govuk-back-link').click()

    })
    it('AC 3 - VCS route -  Make connection requests to voluntary and community sector services - option',()=>{
        cy.visit('/')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge','vcs')

        // What do they need to do? page 
        cy.typeOfUserVCS('1')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?')
         // previous page selection is retained 
        cy.get('[data-testid="VcsManager"]').should('be.checked');
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Who are you adding permissions for?')
         // back link
        cy.get('.govuk-back-link').click()
       

    })
    it('AC 4 - LA - no selection - error message',()=>{
        cy.visit('/')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge','vcs')

        // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select what they need to do')
       // What do they need to do? page 
        cy.typeOfUserVCS('1')

    })
})