describe("| addPerm-la-confirmationPage | FHG-3392 DFE - add permissions - confirmation page", { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    const emailAddress = n + 'abcdef@def.com';
    const fullName = 'Happy Ferret' + n;

    // As a DFE Admin  creating an LA account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    after(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    it('AC 1 - validate content', () => {
        cy.visit('/')        
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)

    })


})