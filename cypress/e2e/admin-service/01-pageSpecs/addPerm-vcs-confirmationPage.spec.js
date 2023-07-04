describe("| addPerm-vcs-confirmationPage | FHG-3579 DFE - add permissions - confirmation page", {tags: ['addPerOnly']},()=>{
        const num = Date.now();
        const n = num.toString();
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n +'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
	})
    it('AC 1 - validate content',()=>{
       cy.confirmationPage('John Paul Smith')
    })
})