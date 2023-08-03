describe("| addPerm-la-confirmationPage | FHG-3392 DFE - add permissions - confirmation page", {tags: ['dfeAdmin']},()=>{
        const num = Date.now();
        const n = num.toString();
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
       cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n +'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
	})
    it('AC 1 - validate content',()=>{
       cy.confirmationPage('John Paul Smith')

    })
})