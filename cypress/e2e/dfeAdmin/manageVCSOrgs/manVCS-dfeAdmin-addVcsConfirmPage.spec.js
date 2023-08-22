describe('| manVCS-addVcsConfirmPage.spec | FHG-3803 Manage VCS - add Organisations ConfirmationPage ', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })
    it('AC 1,2,3  Add VCS Org confirmation page', () => {
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        //manage VCS link
        cy.manVcsLink()
        cy.get('.govuk-pagination__list > :nth-child(2) > .govuk-pagination__link').click()
        cy.get(':nth-child(5) > .govuk-pagination__link').click()
        cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('View').click()
        cy.editVcsName(n + 'Test VCS Org 001')
        cy.get('#buttonContinue').click()
        cy.addVcsOrgConfirm()
        cy.dfeAdminWelcomePage()
    })

})