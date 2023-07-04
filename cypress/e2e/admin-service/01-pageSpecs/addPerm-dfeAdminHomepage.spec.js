describe('| addPerm-dfeAdminHomepage |- FHG-1599 DFE Admin Homepage - add permissions',()=>{
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
	})
    it('AC1 - dfe admin logged in homepage validate content',()=>{
       
        // validate page content 
        // name of person logged in 
        cy.welcomePage('Dfe Admin User')
        // Accounts 
        cy.contains('Accounts')
        cy.contains('Add permissions')
        cy.contains('Add account permissions to manage family support services and manage connection requests')
        cy.contains('Manage permissions')
        cy.contains('View and remove account permissions to manage family support services or manage connection requests')
        // Local Authorities ( LAs)
        cy.contains('Local authorities (LAs)')
        cy.contains('Add an LA service')
        cy.contains('Add a service to the directory.')
        cy.contains('Manage LA services')
        cy.contains('View, change or delete services shown in the directory.')
        cy.contains('Add a family hub')
        cy.contains('Add a family hub to the directory.')
        cy.contains('Manage family hubs')
        cy.contains('View, change or delete family hubs shown in the directory.')
        cy.contains('Activate a local authority')
        cy.contains('Activate an LA before you create its accounts, services and family hubs.')

        //Voluntary Community Organisations ( VCSs)
        cy.contains('Voluntary community organisations (VCSs)')
        cy.contains('Add a VCS service')
        cy.contains('Add a service to the directory.')
        cy.contains('Manage VCS services')
        cy.contains('View, change or delete services shown in the directory.')
        cy.contains('Add a VCS organisation')
        cy.contains('Add an organisation before creating their user accounts.')
        cy.contains('Manage VCS organisations')
        cy.contains('View, change or delete existing organisations.')
    })
    it('AC 2 - User logged in and selects add permissions',()=>{
        cy.addPermissions()
        cy.typeOfUserPage()
    })
})