describe("LA Manager - Add Services - What Is The Service Name Page", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')

    })

    it('Clicking on the back button on the what is the service name page', () => {
        cy.contains('Services').click();
        cy.get('a[href*="/manage-services/start-add-service"]').click();
        cy.clickBackLink();
        cy.title().should('eq', 'Tower Hamlets Council services - Manage family support services and accounts - GOV.UK');
        cy.title().should('include', 'Council services - Manage family support services and accounts - GOV.UK');
    });
});