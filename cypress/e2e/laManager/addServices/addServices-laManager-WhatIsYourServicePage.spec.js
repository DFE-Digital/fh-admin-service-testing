describe("LA Manager - Add Services - Service Added Page", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')

    })

    it('Ensuring that clicking on the back button on the add service page', () => {
        cy.contains('Services').click();
        cy.get('a[href*="/manage-services/start-add-service"]').click();
        cy.clickBackLink();
        cy.title().should('eq', 'Tower Hamlets Council services - Manage family support services and accounts - GOV.UK');
        cy.title().should('include', 'Council services - Manage family support services and accounts - GOV.UK');
    });
});