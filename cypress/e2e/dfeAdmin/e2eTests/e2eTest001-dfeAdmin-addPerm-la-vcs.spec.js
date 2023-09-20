describe('| e2eTest001-addPerm-la-vcs.spec | add permission - la , vcs journey ',{tags: ['dfeAdmin']},function(){
    const num = Date.now();
    const n = num.toString();
    var emailAddress = '';
    var fullName = '';

    beforeEach(()=> {
        emailAddress = n + 'abcdef@def.com';
        fullName = 'Xtreme Quagga' + n;
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
	})

    afterEach(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    // As a DFE Admin  creating an LA account
    it('LA route ',()=>{
		cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.selectWhichLA('redbridge', 'ForUserTypeLa')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    // As a DFE Admin  creating an VCS account
    it('VCS route' ,()=>{
        cy.visit('/')        
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('redbridge', 'ForUserTypeVcs')
        cy.whichOrgVcs('cranbrook')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})