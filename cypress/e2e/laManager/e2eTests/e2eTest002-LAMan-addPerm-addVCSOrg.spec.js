describe('|e2eTest002-addPerm-addVCSOrg | Add permissions - VCS Add Org confirmation page',{ tags: ['LAMan'] },()=>{
    const num = Date.now();
    const n = num.toString();

    beforeEach(()=> {
        cy.integrationLogin('laman') 
	})
   
    it('e2e test add permissions - add vcs org if it doesnt exist',()=>{
       cy.visit('/')
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + '+VCS Organisation name')
        cy.contains(n + '+VCS Organisation name')
        // continue
        cy.checkDetailsPage()
        cy.addVcsOrgConfirmation('LaManager')

        // add permissions using this newly added VCS organisation 
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs(n + '+VCS Organisation name')
        cy.email(n +'-abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')
    })
})