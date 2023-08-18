describe('| myaccountMobPage | FHG-2101 My account page header ',{ tags: ['LAMan'] },()=>{
     beforeEach(()=> {
		cy.visit('/')
        cy.integrationLogin('laman') 
	})
    it('AC 1,2,3 - Header - my account and signout links',function(){
        cy.LAManWelcomePage('London Borough of Redbridge')
         //my account link
        cy.get('.govuk-header__content').contains('My account').click()
        cy.contains('Manage your account')
        //signout link
        cy.get('.govuk-header__content').contains('Sign out').click()
        cy.contains('You have signed out')     
    })

})