describe("VCS Manager - Add Services - What Is The Service Name Page", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Services').click();
        cy.get('a[href*="/manage-services/start-add-service"]').click();
        })


    it('Clicking on the back button on the what is the service name page', () => {
        cy.clickBackLink();
        cy.title().should('include', 'Manage family support services and accounts - GOV.UK');
    });

});