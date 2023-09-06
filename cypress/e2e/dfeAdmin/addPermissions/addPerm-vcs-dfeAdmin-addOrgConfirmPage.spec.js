describe('| addPerm-vcs-addOrgConfirmPage | FGH-3447 VCS Add Org confirmation page', { tags: ['dfeAdmin'] }, () => {
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')        
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('both')
        cy.vcsWhichLA('redbridge')
    })

    it('AC 1,2 - Validate page content , got to home page', () => {
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + '+VCS Organisation name')
        cy.contains(n + '+VCS Organisation name')
        // continue
        cy.checkDetailsPage()
        cy.addVcsOrgConfirmation()
    })
})