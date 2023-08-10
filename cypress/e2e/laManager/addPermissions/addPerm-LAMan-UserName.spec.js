describe("| addPerm-UserName | FHG-3909 LA Manager - add permissions - What's their full name?", { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a LA Manager creating LA and VCS user accounts
    beforeEach(() => {
        cy.visit('/')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
    })

    it('AC 1, 3 - LA - validate page content , back link ', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(n + 'abcdef@def.com')
        cy.contains("What's their full name?")
        cy.fullName('John Smith')
        cy.contains('Check account details')
        // back button - takes user to user name page
        cy.get('.govuk-back-link').click()
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        cy.email('abc@def.com')
        // entering more than 256 characters
        const longName = ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        cy.fullName(`${longName}`)
        cy.contains(`${longName}`)
    })

    it('AC 2 - LA - no name entered - error message', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(n + 'abcdef@def.com')
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter a name')
        // user is able to enter valid name after error message 
        cy.fullName('John Smith')
    })

    it('AC 1, 3 - VCS - validate page content , back link ', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.contains("What's their full name?")
        cy.fullName('John Smith')
        cy.contains('Check account details')
        // back button - takes user to user name page
        cy.get('.govuk-back-link').click()
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        cy.email('abc@def.com')
        // entering more than 256 characters
        const longName = ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        cy.fullName(`${longName}`)
        cy.contains(`${longName}`)
    })

    it('AC 2 - VCS - no name entered - error message', () => {
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter a name')
        // user is able to enter valid name after error message 
        cy.fullName('John Smith')
    })
})