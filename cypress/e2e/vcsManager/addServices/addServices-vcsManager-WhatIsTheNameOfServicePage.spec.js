describe("LA Manager - Add Services - Service Added Page", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Services').click();
        cy.get('a[href*="/manage-services/start-add-service"]').click();
        })


    it('Ensuring that clicking on the back button on the service page navigates back to the LA services page', () => {
        cy.clickBackLink();
        cy.title().should('include', 'Manage family support services and accounts - GOV.UK');
    });

});