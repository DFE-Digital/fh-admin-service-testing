describe('| 📱 addPerm-vcs-e2ejourney-mobile | ',()=>{
        const num = Date.now();
        const n = num.toString();
    
    it(`iphone-x - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.myaccountMob()
        cy.welcomePage('Dfe Admin User')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.typeOfUserPage('vcs')
        cy.myaccountMob()
        cy.typeOfUserVCS('1')
        cy.myaccountMob()
        cy.vcsWhichLA('redbridge')
        cy.myaccountMob()
        cy.whichOrgVcs('cranbrook')
        cy.myaccountMob()
        cy.email(n +'abcdef@def.com')
        cy.myaccountMob()
        cy.fullName('John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage('John Paul Smith')
        cy.myaccountMob()
    
    })
     it(`samsung-s10 - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.myaccountMob()
        cy.welcomePage('Dfe Admin User')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.typeOfUserPage('vcs')
        cy.myaccountMob()
        cy.typeOfUserVCS('1')
        cy.myaccountMob()
        cy.vcsWhichLA('redbridge')
        cy.myaccountMob()
        cy.whichOrgVcs('cranbrook')
        cy.myaccountMob()
        cy.email(n +'+abcdef@def.com')
        cy.myaccountMob()
        cy.fullName('+John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage('+John Paul Smith')
        cy.myaccountMob()
    
    })
    //
     it(`ipad-mini - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.myaccountMob()
        cy.welcomePage('Dfe Admin User')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.typeOfUserPage('vcs')
        cy.myaccountMob()
        cy.typeOfUserVCS('1')
        cy.myaccountMob()
        cy.vcsWhichLA('redbridge')
        cy.myaccountMob()
        cy.whichOrgVcs('cranbrook')
        cy.myaccountMob()
        cy.email(n +'++abcdef@def.com')
        cy.myaccountMob()
        cy.fullName('++John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage('++John Paul Smith')
        cy.myaccountMob()
    
    })
    
})