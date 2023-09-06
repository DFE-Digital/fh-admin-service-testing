describe('| manVcs-dfeAmin-delConfirmNoPage | FHG-3811 DFE Admin - Manage VCS organisation (You have not deleted the service page)', { tags: ['LAMan'] }, () => {

    it('AC 1,2,3 - page content , go to homepage , title ', function () {
        cy.visit('/')
        cy.integrationLogin('laman')
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage()

        cy.DelVcsPage('No')
        // add validation - You have not deleted the service confirmation page
        cy.VcsNotDelPage()
        // homepage
        cy.LAManWelcomePage('London Borough of Redbridge')
    })
})