describe('| myaccountPage | FHG-2101 My account page header ',{tags: ['dfeAdmin']},()=>{
     beforeEach(()=> {
		cy.visit('/')
        cy.integrationLogin('dfeadmin')
       
	})
    it('AC 1,2 - Header - my account',function(){        
         //my account link
        cy.get('.dfeuk-header__username').contains('My account').click()
        cy.contains('Manage your account')
    })

    //  Intermittently fails
    it.skip('AC 4 - Header - Signout links',function(){        
       //signout link
       cy.get('.dfeuk-header__username').contains('Sign out').click()
       cy.contains('You have signed out')
   })


})