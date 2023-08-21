describe('| 📱 addPerm-vcs-e2ejourney-mobile | ',{ tags: ['LAMan'] },()=>{
        const num = Date.now();
        const n = num.toString();
    
    it.skip(`iphone-x - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
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
     it.skip(`samsung-s10 - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
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
     it.skip(`ipad-mini - VCS Journey - Validate mobile version`,function(){
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
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