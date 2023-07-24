describe('Login - Integration + One login',()=>{
     beforeEach(()=> {
        cy.integrationLogin()
        // onelogin 
        cy.OneLogin()

		cy.visit('/')
        // cy.startPage()
        // cy.stubLogin('dfeAdmin')
	})
    it('test ',()=>{
       cy.welcomePage()
    })
})
