describe('| addPerm-vcs-UserEmail | FHG-3577 DFE - add permissions - What is their email address?', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')        
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('tower hamlets', 'ForUserTypeVcs')
        cy.whichOrgVcs('elop')
    })
    
    it('AC 1,4 Page content ,valid email address,back button', () => {
        cy.email(n + 'abcdef@def.com')
        cy.contains("What's their full name?")
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        // which organisation do they work for ?
        cy.contains('Which organisation do they work for?')
    })

    it('AC 2,3 - no data entered , incorrect /invalid email address entered - error message', () => {
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
            // after error message , user is able to continue with entering correct details
            cy.email(n + 'abcdef@def.com')
            // back button - takes user to LA page
            cy.get('.govuk-back-link').click()
        }
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
    })
})