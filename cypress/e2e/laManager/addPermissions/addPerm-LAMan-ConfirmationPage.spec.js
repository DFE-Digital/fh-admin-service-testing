describe("| addPerm-confirmationPage | FHG-3912 LA Manager - add permissions - confirmation page for LA and VCS", { tags: ['LAMan'] }, () => {
    let n;

    beforeEach(() => {
        n = Date.now().toString()
        cy.visit('/')
        cy.integrationLogin('laman')
    })

    // As a DFE Admin  creating an LA account

    it('AC 1,2 - validate confirmation page content for LA journey', () => {
        cy.visit('/')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(n + 'abcdef@def.com')
        cy.fullName(n + 'John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage(n + 'John Paul Smith')
    })

    it('AC 1,2 - validate confirmation page content for VCS journey', () => {
        cy.visit('/')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n + 'abcdef@def.com')
        cy.fullName(n + 'John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage(n + 'John Paul Smith')
    })
})
