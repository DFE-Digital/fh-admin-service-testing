describe('| manVcs-dfeAmin-delOrgPage | , FHG-3805 DFE Admin -Manage VCS organisations (Deleting an organisation page)', { tags: ['LAMan'] }, () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    });

    it('AC 1,5,6 - page content , back link , title ', function () {
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage()
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage organisations')

    })

    it('AC 2 - Yes, I want to delete it', function () {
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage('Yes')
        // add validation - You have deleted the service confirmation page
        cy.contains('You have deleted')
    })

    it('AC 3 - No, I want to keep it ,', function () {
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage('No')
        // add validation - You have not deleted the service confirmation page
        cy.VcsNotDelPage()
    })
    
    it('AC 4 - error messages  ,', function () {
        //manage VCS link
        cy.laManVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage()
        // error message when user does not select one of the options
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Select if you want to delete the organisation')
        // make a selection
        cy.DelVcsPage('No')
    })
})