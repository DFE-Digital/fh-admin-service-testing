describe('| e2eTest001-addPerm-la-vcs.spec | add permission - la , vcs journey ',{ tags: ['LAMan'] },function(){
    const num = Date.now();
    const n = num.toString();

    beforeEach(()=> {
    //     // integration login
        cy.integrationLogin('laman')
        
	})
    // As a DFE Admin  creating an LA account
    it('LA route ',()=>{
		cy.visit('/')
        //// cy.startPage()
        // // cy.stubLogin('dfeAdmin')
        cy.LAManWelcomePage()
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge','la')
        cy.typeOfUserLA('1')
        //cy.laWhichLA('redbridge')
        cy.email(n +'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
       cy.confirmationPage('John Paul Smith')
    })
    // As a DFE Admin  creating an VCS account
    it('VCS route' ,()=>{
        cy.visit('/')
        //// cy.startPage()
        // cy.stubLogin('dfeAdmin')
        
        cy.LAManWelcomePage()
        cy.addPermissions()
        cy.LAManTypeOfUserPage('London Borough of Redbridge','vcs')
        cy.typeOfUserVCS('1')
        //cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n +'-abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')
    })
})