describe('| addPerm-UserEmail | FHG-3887 DFE - add permissions - What is their email address?', { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a LA Manager, creating LA and VCS accounts
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.gotoAddPermissionsPage()
    })

    it('AC 1,4 LA Page content ,valid email address,back button', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(n + 'abcdef@def.com')
        cy.contains("What's their full name?")
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        cy.contains('What do they need to do?');
    })

    it('AC 2,3 - LA no data entered, incorrect /invalid email address entered - error message', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        // error message when user does not enter any email address
        cy.get('#buttonContinue').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')

        const invalidEmails = ['test@', 'test123', '@abc.com', ' '];
        for (let i = 0; i < invalidEmails.length; i++) {
            // user enters invalid email address
            cy.email(`${invalidEmails[i]}`)
            cy.get('.govuk-error-summary').contains('There is a problem')
            cy.get('.govuk-error-summary').contains('Enter an email address')
            // after error message , user is able to continue with entering correct details
            cy.email(n + 'abcdef@def.com')
            // back button - takes user to LA page
            cy.get('.govuk-back-link').click()
        }
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
    })

    it('AC 1,4 VCS Page content ,valid email address,back button', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.contains("What's their full name?")
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        // back button - takes user to VCS page
        cy.get('.govuk-back-link').click()
        cy.contains('Which organisation do they work for?');
    })

    it('AC 2,3 - VCS no data entered , incorrect /invalid email address entered - error message', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        // error message when user does not enter any email address
        cy.get('#buttonContinue').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')

        const invalidEmails = ['test@', 'test123', '@abc.com', ' '];
        for (let i = 0; i < invalidEmails.length; i++) {
            // user enters invalid email address
            cy.email(`${invalidEmails[i]}`)
            cy.get('.govuk-error-summary').contains('There is a problem')
            cy.get('.govuk-error-summary').contains('Enter an email address')
            // after error message , user is able to continue with entering correct details
            cy.email(n + 'abcdef@def.com')
            // back button - takes user to LA page
            cy.get('.govuk-back-link').click()
        }
        // back button - takes user to VCS page
        cy.get('.govuk-back-link').click()
    })
})