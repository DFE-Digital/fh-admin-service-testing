describe('| myaccountMobPage | FHG-2101 ,FHG-2106 My account page header + my account page ',()=>{
     beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
	})
    it('AC 1',function(){
         cy.welcomePage('Dfe Admin User')
         cy.myaccountMob()
         
        
    })

})