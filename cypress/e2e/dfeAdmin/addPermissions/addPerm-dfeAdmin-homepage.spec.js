describe('| addPerm-dfeAdminHomepage | FHG-1599 DFE Admin Homepage - add permissions',{tags: ['dfeAdmin']},()=>{
     beforeEach(()=> {
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
       
	})
    
    it('AC1 - dfe admin logged in homepage validate content',()=>{
       cy.visit('/')
        // validate page content 
        // name of person logged in 
        cy.dfeAdminWelcomePage()
        // Accounts 
        cy.contains('Accounts')
        cy.contains('Add permissions')
        cy.contains('Add account permissions to manage family support services and manage connection requests')
        cy.contains('Manage permissions')
        cy.contains('View and remove account permissions to manage family support services or manage connection requests')
        
        //Voluntary Community Organisations ( VCSs)
        cy.contains('Voluntary community organisations (VCSs)')
        cy.contains('Add a VCS organisation')
        cy.contains('Add an organisation before adding permissions for its users.')
        cy.contains('Manage VCS organisations')
        cy.contains('View, change or delete existing organisations.')
    })
    it('AC 2 - User logged in and selects add permissions',()=>{
        cy.visit('/')
        cy.addPermissions()
        cy.typeOfUserPage()
    })
})