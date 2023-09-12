// FHG-3708
describe('| manPerm-managePermissionsPage.spec | FHG-3708 Manage permissions - edit user email ', { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    });

    it('AC 1 - page content', function () {
        cy.visit('/')
        //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()
        // edit email link
        cy.get('#linkEmail').click()
        // enter a valid email id 
        cy.email(n + 'abcdef@def.com')
        cy.contains("Email address changed")
    })

    it('AC 1,4 Page content , back button', () => {
        cy.visit('/')
        //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()
        // edit email link
        cy.get('#linkEmail').click()
        // enter a valid email id 
        // cy.email(n + 'abcdef@def.com')
        cy.contains("What's their email address?")
        // back button - takes user to edit page
        cy.get('.govuk-back-link').click()
        // back button - takes user to manage permissions page
        cy.get('.govuk-back-link').click()
        cy.contains('Manage user permissions')
    })

    it('AC 2,3 - no data entered , incorrect /invalid email address entered - error message', () => {
        cy.managePermissionsLink()
        cy.editPermissionsLink()
        cy.get('#linkEmail').click()

        // error message when user does not enter any email address
        cy.get('#buttonContinue').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')

        const invalidEmails = ['test@', 'test123', '@abc.com'];
        for (let i = 0; i < invalidEmails.length; i++) {
            // user enters invalid email address
            cy.email(`${invalidEmails[i]}`)
            cy.get('.govuk-error-summary').contains('There is a problem')
            cy.get('.govuk-error-summary').contains('Enter an email address')
        }

        // after error message , user is able to continue with entering correct details
        cy.email(n + 'abcdef@def.com')
        cy.contains('Email address changed')

        // back button - takes user to LA page
        cy.get('.govuk-button').contains('Go to homepage').click()
        cy.contains('London Borough of Redbridge')
    })
})