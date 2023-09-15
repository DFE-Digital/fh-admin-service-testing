describe('| e2eTest001-addPerm-la-vcs.spec | add permission - la , vcs journey ',{ tags: ['LAMan'] },function(){
    const num = Date.now();
    const n = num.toString();

    beforeEach(()=> {
        cy.integrationLogin('laman') 
	})

    // creating an LA account
    it('LA route ',()=>{
		cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(n + 'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.contains('Check account details')
        cy.checkAnswerPage()
       cy.confirmationPage('John Paul Smith')
    })

    // creating an VCS account
    it('VCS route' ,()=>{
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(n +'-abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')
    })
})