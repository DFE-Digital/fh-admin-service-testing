describe("| addPerm-la-confirmationPage | FHG-3392 DFE - add permissions - confirmation page", { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an LA account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })
    it('AC 1 - validate content', () => {
        cy.visit('/')        
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n + 'abcdef@def.com')
        cy.fullName('Happy Ferret')
        cy.checkAnswerPage()
        cy.confirmationPage('Happy Ferret')
    })
})