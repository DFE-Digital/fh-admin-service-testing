describe('| manPerm-userPermissions | FHG-1617 Manage permissions ( Manage User Permissions) Page ',()=>{
    
    it('AC 1 ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //my account link
        cy.get('.govuk-header__content').contains('My account').click()
        cy.contains('Manage your account')
        //signout link
        cy.get('.govuk-header__content').contains('Sign out').click()
        cy.contains('You have signed out')     
    })

})