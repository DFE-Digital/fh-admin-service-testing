describe('| welcome page ', { tags: ['dfeAdmin'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it('validate content', () => {
        cy.dfeAdminWelcomePage()
    })
})