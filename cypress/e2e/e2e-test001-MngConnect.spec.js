describe('| e2e-test001-MngConnect | Manage - add VCS organisation , add la and vcs permissions , Connect - create and approve request , view requests',()=>{

    it('Manage - (dfe admin) Add VCS organisation using spread sheet',()=>{
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.dfeAdminWelcomePage()
        cy.uploadSheet()  
        // validate if the vcs has been added 
        cy.get('.govuk-header__product-name').click()
        cy.manVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.contains('Test Harsha Madhu Vcs001')
	
    
    // Manage - (dfe admin) Add permissions to user LA Professional 
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('2')
        cy.laWhichLA('tower hamlets')
        cy.email('harshare139@googlemail.com')
        cy.fullName('TH - LA Pro')
        cy.checkAnswerPage()
        cy.confirmationPage('TH - LA Pro')
    
    // Manage - (dfe admin) Add permissions to user VCS Professional 
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('2')
        cy.vcsWhichLA('tower hamlets')
        cy.whichOrgVcs('Test Harsha Madhu Vcs001')
        cy.email('harshareddy.leeds@googlemail.com')
        cy.fullName('TH - VCS Pro')
        cy.checkAnswerPage()
        cy.confirmationPage('TH - VCS Pro')
        // sign out as dfe admin
        cy.wait(2000)
        cy.signOut()

    })
    // session details change - sign in as LA Pro = user id = harshare139@googlemail.com
     // user id = 
    it.skip('Connect - (la Professional) Make and view connection request ',()=>{
        cy.visit('https://test.connect-families-to-support.education.gov.uk')

    })
    it.skip('sign out as La Pro',()=>{
        cy.visit('/')
        cy.signOut()

    })

    // session details change - sign in as LA Pro = user id = harshareddy.leeds@googlemail.com

    it.skip('Connect Dashboard - (VCS Professional ) view and accept requests ',()=>{
        cy.visit('/')
    })
    it.skip('sign out as VCS Pro',()=>{
        cy.visit('/')
        cy.signOut()

    })
    it('Manage - ( dfe admin) - delete LA Professional user permissions',()=>{
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.dfeAdminWelcomePage()
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.emailFilter('harshare139@googlemail.com')
        // delete permissions link
        cy.deletePermissionsLink()
        cy.deletePermissionsOptionPage('TH - LA Pro','Yes')
        cy.deletePermissionsConfirmPage('TH - LA Pro')
       

    })
    // session details change - sign in as dfe Admin = user id = dfe admin
    it.skip('Manage - (dfe admin) delete VCS organisation',()=>{
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.dfeAdminWelcomePage()
         //manage VCS link
        cy.manVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
       cy.get(':nth-child(9) > .govuk-table__cell--numeric > .govuk-\!-margin-right-0').click()
        
        // cy.manVcsDel()
        cy.DelVcsPage()    

         cy.DelVcsPage('Yes')    
        // add validation - You have not deleted the service confirmation page
        cy.VcsYesDelPage()
        // homepage
        cy.dfeAdminWelcomePage()

       
	})
})