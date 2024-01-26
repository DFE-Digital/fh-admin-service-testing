describe('| manVCS-addVcsConfirmPage.spec | FHG-3803 Manage VCS - add Organisations ConfirmationPage ', { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();

    it('AC 1,2,3  Add VCS Org confirmation page', () => {
        cy.visit('/')
        cy.integrationLogin('laman')
        //manage VCS link
        cy.laManVcsLink()
        cy.get('.govuk-pagination__list > :nth-child(2) > .govuk-pagination__link').click()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('View').click()
        cy.editVcsName(n + 'Test VCS Org 001')
        cy.get('#buttonContinue').click()
        cy.addVcsOrgConfirm()
        cy.LAManWelcomePage('Tower Hamlets Council')
    })
})