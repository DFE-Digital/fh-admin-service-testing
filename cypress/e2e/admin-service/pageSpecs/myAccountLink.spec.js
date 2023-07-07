describe('| myaccountMobPage | FHG-2101 My account page header ',()=>{
     beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
	})
    it('AC 1,2,3 - Header - my account and signout links',function(){
        cy.welcomePage('Dfe Admin User')
         //my account link
        cy.get('.govuk-header__content').contains('My account').click()
        cy.contains('Manage your account')
        //signout link
        cy.get('.govuk-header__content').contains('Sign out').click()
        cy.contains('You have signed out')     
    })

})