describe('LA Man - performance data - navigate to view reports page', () => {
    beforeEach(() => {
        // Given I am logged in as LA admin
        cy.visit('/')
        cy.integrationLogin('laman')
        // When I click the view data link
        cy.contains('View Data').click();
    })

    it('user can navigate to view reports page', () => {
        const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/performance-data/Connect";

        // Then the Connect report page is displayed
        cy.checkPageUrl(expectedPageUrl);

    })

    it('user can navigate to back to homepage from view reports page', () => {
        const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/Welcome";

        // When I click the back button
        cy.clickBackLink();

        // Then I am navigated back to the homepage
        cy.checkPageUrl(expectedPageUrl);

    })

    it('user can navigate to Find report', () => {
        const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/performance-data/Find";

        // When I click the Find report option
        cy.contains('Find support for your family').click();

        // Then the Find report page is displayed
        cy.checkPageUrl(expectedPageUrl);

    })
});