describe('| manageAccountPage | FHG-2106 My account - Manage your account page ', { tags: ['LAMan'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    })
    it('AC 1,4, Page content , Change name , back button ', function () {
        cy.get('.govuk-link--inverse').contains('My account').click()
        cy.myaccountPage()
        // click on change name
        cy.get('.govuk-summary-list__actions > a').click()
        cy.contains('Change your name')
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage your account')
    })
    
    it('AC 2 - manage your gov.uk one login link', () => {
        cy.get('.govuk-link--inverse').contains('My account').click()
        cy.myaccountPage()
        // check href contains gov uk integration link
        cy.get('a').contains('Manage your GOV.UK One Login details').should('have.attr', 'href', 'https://home.integration.account.gov.uk')
    })

})