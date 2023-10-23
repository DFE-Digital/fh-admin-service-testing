describe('| addPerm-la-typeOfRole | FHG-1065 DFE - add permissions - who are you adding permissions for? ', { tags: ['dfeAdmin'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')

    })
    it('AC 1,5 -  validate content', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.title().should('eq', 'Who are you adding permissions for? - Manage family support services and accounts - GOV.UK')
        cy.pageHeadings().contains('Who are you adding permissions for?')
        cy.contains('Someone who works for a local authority')
        cy.contains('Someone who works for a voluntary and community sector organisation')

        cy.typeOfUserPage('la')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Someone who works for a local authority')

    })
    it('AC 2  -  LA option', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA()
    })
    it('AC 3  -  VCS option', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS()
    })
    it('AC 4  -  error message', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        // error message when user does not select one of the options
        cy.get('#buttonContinue').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select the type of user you are adding')
        //user makes a seletion
        cy.typeOfUserPage('la')
        cy.typeOfUserLA()
    })
})
