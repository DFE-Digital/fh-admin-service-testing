describe('| addPerm-LAMan-typeOfUser.spec | FHG-3872 LA manager - What do they need to do?', { tags: ['LAMan'] }, () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('Tower Hamlets Council', 'la')
    })

    it('AC 1,2,6 -  validate content , LA - Add and manage services, family hubs and accounts - option, back button', () => {
        // What do they need to do? page 
        cy.typeOfUserLA('1')
        // which LA page
        cy.pageHeadings().contains("What's their email address?")
        // back link
        cy.get('.govuk-back-link').click()
        cy.get('.govuk-back-link').click()
        cy.contains('Who are you adding permissions for?')
        // previous page selection is retained 
        cy.get('#radio-LA').should('be.checked');
    })

    it('AC 3 - LA -  Make connection requests to voluntary and community sector services - option', () => {
        // What do they need to do? page 
        cy.typeOfUserLA('2')
        // which LA page
        cy.pageHeadings().contains("What's their email address?")
        // back link
        cy.get('.govuk-back-link').click()
        cy.get('.govuk-back-link').click()
        cy.contains('Who are you adding permissions for?')
        // previous page selection is retained 
        cy.get('#radio-LA').should('be.checked');
    })

    it('AC 4 - LA -  Select both options', () => {
        // What do they need to do? page 
        cy.typeOfUserLA('both')
        // which LA page
        cy.pageHeadings().contains("What's their email address?")
        // back link
        cy.get('.govuk-back-link').click()
        cy.get('.govuk-back-link').click()
        cy.contains('Who are you adding permissions for?')
        // previous page selection is retained 
        cy.get('#radio-LA').should('be.checked');
    })

    it('AC 5 - LA - no selection - error message', () => {

        // error message when user does not select one of the options
        cy.get('form > .govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select what they need to do')
        // What do they need to do? page 
        cy.typeOfUserLA('2')
        // which LA page
        cy.pageHeadings().contains("What's their email address?")

    })
})