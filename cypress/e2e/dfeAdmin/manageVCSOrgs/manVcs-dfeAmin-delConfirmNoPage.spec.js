describe('| manVcs-dfeAmin-delConfirmNoPage | FHG-3811 DFE Admin - Manage VCS organisation (You have not deleted the service page)', { tags: ['dfeAdmin'] }, () => {
    const loggedInUserRole = 'DfeAdmin';

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it('AC 1,2,3 - page content , go to homepage , title ', function () {
        cy.visit('/')
        //manage VCS link
        cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.deleteOrganisationLink('Any')
        cy.DelVcsPage()

        cy.DelVcsPage('No')
        // add validation - You have not deleted the service confirmation page
        cy.VcsNotDelPage()
        // homepage
        cy.dfeAdminWelcomePage()
    })
})