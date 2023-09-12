describe('| 📱 addPerm-vcs-e2ejourney-mobile | ', { tags: ['LAMan'] }, () => {
    const num = Date.now();
    const n = num.toString();

    it(`iphone-x - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')

    })
    it(`samsung-s10 - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + '+abcdef@def.com')
        cy.fullName('+John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('+John Paul Smith')

    })

    it(`ipad-mini - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + '++abcdef@def.com')
        cy.fullName('++John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('++John Paul Smith')
    })

})