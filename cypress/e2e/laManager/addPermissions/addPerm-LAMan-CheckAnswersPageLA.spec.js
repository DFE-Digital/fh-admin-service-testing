describe("| addPerm-la-checkAnswerPage | FHG-3911 LA manager - add permissions - check account details page", { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('Tower Hamlets Council', 'la')
        cy.typeOfUserLA('1')
    })

    it('AC 1,2,4 - validate page content , confirmation page, back link ', () => {
        const expectedContent = {
            'Who for': 'Someone who works for Tower Hamlets Council',
            'Type of permission': 'Add and manage services, family hubs and accounts',
            'Email address': n + 'abcdef@def.com',
            'Name': n + 'John Paul Smith',
        };

        cy.email(n + 'abcdef@def.com')
        cy.fullName(n + 'John Paul Smith')
        cy.contains('Check account details')
        cy.checkAnswerDetails(expectedContent)
        // back button - takes user to user name page
        cy.get('.govuk-back-link').click()
        cy.contains("What's their full name?")
        cy.fullName(n + 'John Smith')
        //next page 
        cy.checkAnswerPage()
        cy.contains('Permissions added')
    })

    it('AC 3 - Change link - who for', () => {
        const expectedContent = {
            'Who for': 'Someone who works for a voluntary and community sector organisation Tower Hamlets Council',
            'Type of permission': 'Add and manage services, View and respond to connection requests',
            'Voluntary and community organisation': 'Toyhouse Libraries Associations',
            'Email address': n + 'abcdef@defg.com',
            'Name': n + 'John Steven Smith',
        };
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Paul Smith')
        cy.get('#linkWhoFor').click()
        cy.LAManTypeOfUserPage('Tower Hamlets Council', 'vcs')
        cy.typeOfUserVCS('both')
        cy.whichOrgVcs('Toyhouse')
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Steven Smith')

        // validate response
        cy.contains('Check account details')
        cy.checkAnswerDetails(expectedContent)
    })

    it('AC 3 - Change link - Type of permission', () => {
        const expectedContent = {
            'Who for': 'Someone who works for Tower Hamlets Council',
            'Type of permission': 'Add and manage services, family hubs and accounts, Make connection requests to voluntary and community sector services',
            'Email address': n + 'abcdef@defg.com',
            'Name': n + 'John Steven Smith',
        };
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Paul Smith')
        cy.get('#linkTypeOfPermission').click()
        cy.typeOfUserLA('both')
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Steven Smith')
        // validate response
        cy.contains('Check account details')
        cy.checkAnswerDetails(expectedContent)
    })

    it('AC 3 - Change link - Email address', () => {
        const expectedContent = {
            'Who for': 'Someone who works for Tower Hamlets Council',
            'Type of permission': 'Add and manage services, family hubs and accounts',
            'Email address': n + 'new.email@defg.com',
            'Name': n + 'John Steven Smith',
        };
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Paul Smith')
        cy.get('#linkEmailAddress').click()
        cy.email(n + 'new.email@defg.com')
        cy.fullName(n + 'John Steven Smith')
        // validate response
        cy.contains('Check account details')
        cy.checkAnswerDetails(expectedContent)
    })

    it('AC 3 - Change link - Name', () => {
        const expectedContent = {
            'Who for': 'Someone who works for Tower Hamlets Council',
            'Type of permission': 'Add and manage services, family hubs and accounts',
            'Email address': n + 'abcdef@defg.com',
            'Name': n + 'John Paul Smith Jr',
        };
        cy.email(n + 'abcdef@defg.com')
        cy.fullName(n + 'John Paul Smith')
        cy.get('#linkFullName').click()
        cy.fullName(n + 'John Paul Smith Jr')
        // validate response
        cy.contains('Check account details')
        cy.checkAnswerDetails(expectedContent)
    })
})