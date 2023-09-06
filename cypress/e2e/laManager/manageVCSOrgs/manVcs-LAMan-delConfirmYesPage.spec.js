describe('| manVcs-dfeAmin-delConfirmYesPage | FHG-3807 DFE Admin - Manage VCS organisations (You have deleted the service page)', { tags: ['LAMan'] }, () => {

    it('AC 1,2,3 - page content , go to homepage , title ', function () {
        cy.visit('/')
        cy.integrationLogin('laman')
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage()

        cy.DelVcsPage('Yes')
        // add validation - You have not deleted the service confirmation page
        cy.VcsYesDelPage()
        // homepage
        cy.LAManWelcomePage('London Borough of Redbridge')
    })
})