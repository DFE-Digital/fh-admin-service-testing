describe('| 📱 addPerm-vcs-e2ejourney-mobile | ', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it(`iphone-x - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')
    })

    it(`samsung-s10 - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + '+abcdef@def.com')
        cy.fullName('+John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('+John Paul Smith')
    })

    it(`ipad-mini - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + '++abcdef@def.com')
        cy.fullName('++John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('++John Paul Smith')
    })

})