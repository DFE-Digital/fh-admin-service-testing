describe.skip('| welcome page ', { tags: ['vcsAdmin'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
    })

    it('validate content', () => {
        cy.VCSManWelcomePage('Elop Mentoring')
    })
})