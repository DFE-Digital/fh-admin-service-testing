describe("| addPerm-vcs-confirmationPage | FHG-3579 DFE - add permissions - confirmation page", { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    const emailAddress = n + 'abcdef@def.com';
    const fullName = 'Happy Yak' + n;

    // As a DFE Admin  creating an LA account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')        
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('tower hamlets', 'ForUserTypeVcs')
        cy.whichOrgVcs('elop')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
    })

    after(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    it('AC 1 - validate content', () => {
        cy.confirmationPage(fullName)
    })
})