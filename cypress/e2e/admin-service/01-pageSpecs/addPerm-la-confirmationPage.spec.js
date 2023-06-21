describe("addPerm-la-confirmationPage - FHG-3392 DFE - add permissions - confirmation page", {tags: ['addPerOnly']},()=>{
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.whichLA('redbridge')
        cy.email('abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
	})
    it('AC 1 - validate content',()=>{
       cy.confirmationPageLA('John Paul Smith')

    })
})