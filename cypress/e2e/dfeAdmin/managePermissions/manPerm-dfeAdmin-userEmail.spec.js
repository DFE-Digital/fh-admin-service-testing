// FHG-3708
describe('| manPerm-managePermissionsPage.spec | FHG-3708 Manage permissions - edit user email ', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })
    it('AC 1 , 4 - page content , back link ', function () {
        cy.visit('/')
        //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()
        // edit email link
        cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
        // enter a valid email id 
        cy.email(n + 'abcdef@def.com')
        // back link
        // cy.get('.govuk-back-link').click()
        // cy.dfeAdminWelcomePagecomePage()

    })
    it('AC 1,4 Page content ,valid email address,back button', () => {
        //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()
        // edit email link
        cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
        // enter a valid email id
        // cy.email(n + 'abcdef@def.com')

        // back button - takes user to user permission page
        cy.get('.govuk-back-link').click()
        // back button - takes user to mange users permission page
        cy.get('.govuk-back-link').click()
        cy.contains('Manage user permissions')
    })
    it('AC 2,3 - no data entered , incorrect /invalid email address entered - error message', () => {
        //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()
        // edit email link
        cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
        // error message when user does not enter any email address
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')

        const invalidEmails = ['test@', 'test123', '@abc.com'];
        for (let i = 0; i < invalidEmails.length; i++) {
            // user enters invalid email address
            cy.email(`${invalidEmails[i]}`)
            cy.get('.govuk-error-summary').contains('There is a problem')
            cy.get('.govuk-error-summary').contains('Enter an email address')
            // after error message , user is able to continue with entering correct details            
        }
        cy.email(n + 'abcdef@def.com')
        cy.contains('Email address changed')
    })
})