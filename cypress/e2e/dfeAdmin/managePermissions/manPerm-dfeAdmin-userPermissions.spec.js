describe('| manPerm-userPermissions | FHG-1617 Manage permissions ( Manage User Permissions) Page ', { tags: ['dfeAdmin'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it('AC 1 ', function () {
        cy.visit('/')
        //my account link
        cy.get('.govuk-link--inverse').contains('My account').click()
        cy.contains('Manage your account')
        //signout link
        cy.get('.govuk-link--inverse').contains('Sign out').click()
        cy.contains('You have signed out')
    })
})