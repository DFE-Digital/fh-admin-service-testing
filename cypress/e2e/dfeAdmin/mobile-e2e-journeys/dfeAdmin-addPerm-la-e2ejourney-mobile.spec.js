describe('| 📱 addPerm-la-e2ejourney-mobile |', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it(`ipad-mini - LA Journey - Validate mobile version`, function () {
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n + '+abcdef@def.com')
        cy.fullName(n + '+John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage(n + '+John Paul Smith')
    })

    it('iphone - LA Journey - Validate mobile version', () => {
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n + '-abcdef@def.com')
        cy.fullName(n + '-John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage(n + '-John Paul Smith')
    })

    it('samsung-s10 - LA Journey - Validate mobile version', () => {
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n + 'abcdef@def.com')
        cy.fullName(n + 'John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage(n + 'John Paul Smith')
    })
})