describe('|e2eTest002-addPerm-addVCSOrg | Add permissions - VCS Add Org confirmation page',{tags: ['dfeAdmin']},()=>{
    const num = Date.now();
    const n = num.toString();
    const emailAddress = n + 'abcdef@def.com';
    const fullName = 'John Paul Smith' + n;

    beforeEach(()=> {
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
       
	})

    after(() => {
        cy.deleteUser(emailAddress, fullName)
    })
   
    it('e2e test add permissions - add vcs org if it doesnt exist',()=>{
       cy.visit('/')
        //// cy.startPage()
        // // cy.stubLogin('dfeAdmin')
        cy.dfeAdminWelcomePage()

        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('both')
        cy.vcsWhichLA('redbridge')
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + '+VCS Organisation name')
        cy.contains(n + '+VCS Organisation name')
        // continue
        cy.checkDetailsPage()
        cy.addVcsOrgConfirmation('DfeAdmin')

        // add permissions using this newly added VCS organisation 
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs(n + '+VCS Organisation name')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})