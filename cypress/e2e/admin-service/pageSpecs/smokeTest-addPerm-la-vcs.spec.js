describe('| smokeTest-addPerm-la-vcs.spec | add permission - la , vcs journey ',function(){
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an LA account
    it('LA route ',()=>{
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(n +'abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
       cy.confirmationPage('John Paul Smith')
    })
    // As a DFE Admin  creating an VCS account
    it('VCS route' ,()=>{
        cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n +'-abcdef@def.com')
        cy.fullName('John Paul Smith')
        cy.checkAnswerPage()
        cy.confirmationPage('John Paul Smith')
    })
})