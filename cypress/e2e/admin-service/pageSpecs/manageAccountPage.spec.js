describe('| manageAccountPage | FHG-2106 My account - Manage your account page ',()=>{
     beforeEach(()=> {
		cy.visit('/')
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
	})
    it('AC 1,4, Page content , Change name , back button ',function(){
         cy.welcomePage( )
         cy.get('.govuk-header__container').contains('My account').click()
         cy.myaccountPage()
         // click on change name
         cy.get('.govuk-table__cell--numeric > a').click()
         cy.contains('Change your name')
         // back link
         cy.get('.govuk-back-link').click()
         cy.contains('Manage your account')     
    })
    it('AC 2 - manage your gov.uk one login link',()=>{
         cy.welcomePage( )
         cy.get('.govuk-header__container').contains('My account').click()
         cy.myaccountPage()
        // check href contains gov uk integration link
        cy.get('.govuk-link').should('have.attr', 'href', 'https://home.integration.account.gov.uk')
    })

})