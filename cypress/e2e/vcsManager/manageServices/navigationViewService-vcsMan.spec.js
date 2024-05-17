describe('VCS Man - manage services - navigate to view service page', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('vcsman')
        // And I click the manage services link
        cy.contains('Services').click();
    })

    it('user can navigate to view service page', () => {
        const expectedPageHeading = "The Vench services";
        const expectedResultsHeading = "Services";

        // Then the page heading is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the results heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#results > div > div > div > table > thead > tr > th:nth-child(1) > a', expectedResultsHeading);

        // And the results are displayed
        cy.get('[id="results"]').should('exist');

    })
});