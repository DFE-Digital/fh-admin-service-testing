describe('| addPerm-LAMan-homepage | FHG-1699 LA manager - Home page', { tags: ['LAMan'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    })


    it('AC 1,11 - LA Manager logged in homepage validate content', () => {
        cy.visit('/')
        // validate page content 
        // name of person logged in 
        cy.LAManWelcomePage('Tower Hamlets Council')

    })
    it('AC 2,3,4,5,6,7,8,9 -page links', () => {
        cy.visit('/')
        cy.LAManWelcomePage('Tower Hamlets Council')

        cy.contains('Add a user').click()
        cy.get('.govuk-back-link').click()

        cy.contains('Manage users').click()
        cy.get('.govuk-back-link').click()

        // cy.contains('Add an LA service').click()
        // cy.go(-1)

        // cy.contains('Manage LA services').click()
        // cy.go(-1)

        // cy.contains('Add a family hub').click()
        //  cy.go(-1)

        // cy.contains('Manage family hubs').click()
        //  cy.go(-1)

        cy.contains('Add an organisation').click()
        cy.get('.govuk-back-link').click()

        cy.contains('Manage organisations').click()
        cy.get('.govuk-back-link').click()
    })
})