describe('Login - Integration + One login', { tags: ['dfeAdmin'] }, () => {

    it('test ', () => {
        cy.visit('/')
        cy.addPermissions()
    })
})
