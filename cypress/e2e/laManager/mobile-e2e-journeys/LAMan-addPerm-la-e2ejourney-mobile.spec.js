describe('| 📱 addPerm-la-e2ejourney-mobile |',{ tags: ['LAMan'] },()=>{
        const num = Date.now();
        const n = num.toString();

    it(`ipad-mini - LA Journey - Validate mobile version`,function(){
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.myaccountMob()
        cy.typeOfUserLA('1')
        cy.myaccountMob()
        cy.email(n +'+abcdef@def.com')
        cy.myaccountMob()
        cy.fullName(n + '+John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage(n + '+John Paul Smith')
    })
    it('iphone - LA Journey - Validate mobile version',()=>{
        cy.clearCookies()
        cy.viewport(`iphone-x`)
        
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.myaccountMob()
        cy.typeOfUserLA('1')
        cy.myaccountMob()
        cy.email(n +'-abcdef@def.com')
        cy.myaccountMob()
        cy.fullName(n + '-John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage(n + '-John Paul Smith')

    })
    it('samsung-s10 - LA Journey - Validate mobile version',()=>{
        cy.clearCookies()
        cy.viewport(`samsung-s10`) 
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.myaccountMob()
        cy.LAManWelcomePage('London Borough of Redbridge')
        cy.myaccountMob()
        cy.addPermissions()
        cy.myaccountMob()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.myaccountMob()
        cy.typeOfUserLA('1')
        cy.myaccountMob()
        cy.email(n +'abcdef@def.com')
        cy.myaccountMob()
        cy.fullName(n + 'John Paul Smith')
        cy.myaccountMob()
        cy.checkAnswerPage()
        cy.myaccountMob()
        cy.confirmationPage(n + 'John Paul Smith')

    })
})