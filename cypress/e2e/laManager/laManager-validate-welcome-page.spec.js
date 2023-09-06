describe('| welcome page ', { tags: ['dfeAdmin'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    })

    it('validate content', () => {
        cy.LAManWelcomePage('London Borough of Redbridge')
    })
})