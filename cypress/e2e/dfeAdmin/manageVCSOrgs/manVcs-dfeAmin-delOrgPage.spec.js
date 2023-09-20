describe('| manVcs-dfeAmin-delOrgPage | , FHG-3805 DFE Admin -Manage VCS organisations (Deleting an organisation page)', { tags: ['dfeAdmin'] }, () => {
    const loggedInUserRole = 'DfeAdmin';

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it('AC 1,5,6 - page content , back link , title ', function () {
        cy.visit('/')
        //manage VCS link
        cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.deleteOrganisationLink('Any')
        cy.DelVcsPage()
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage organisations')
    })

    it('AC 2 - Yes, I want to delete it', function () {
        cy.visit('/')
        //manage VCS link
        cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.deleteOrganisationLink()
        cy.DelVcsPage('Yes')
        // add validation - You have deleted the service confirmation page
        cy.contains('')
    })

    it('AC 3 - No, I want to keep it ,', function () {
        cy.visit('/')
        //manage VCS link
        cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.deleteOrganisationLink('Any')
        cy.DelVcsPage('No')
        // add validation - You have not deleted the service confirmation page
        cy.VcsNotDelPage()
    })

    it.only('AC 4 - error messages  ,', function () {
        cy.visit('/')
        //manage VCS link
        cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.deleteOrganisationLink('Any')
        cy.DelVcsPage()
        // error message when user does not select one of the options
        cy.get('#buttonConfirm').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select if you want to delete the organisation')
        // make a selection
        cy.DelVcsPage('No')
    })
})