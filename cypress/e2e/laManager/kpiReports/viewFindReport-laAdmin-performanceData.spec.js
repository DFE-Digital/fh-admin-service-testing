describe('LA Man - performance data - navigate to view reports page', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('laman')
        // And I am on the Performance data for Find support for your family LA Admin page
        cy.navigateToViewFindReportsPage();
    })

    it('correct page headings displayed for find report', () => {
        const expectedPageHeading = "Performance data for Find families to support";
        const expectedSubtext = "Data about local authority services in the Tower Hamlets Council local authority area.";
        const expectedResultsHeading = "Overall totals for Tower Hamlets Council";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading("p", expectedSubtext);

        // And the results heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#results > div > div > div > table > thead > tr > th:nth-child(1) > a', expectedResultsHeading);

    })

    it('user can view total number of searches conducted for services in LA', () => {
        const expectedPageHeading = "Total number of searches in the last 4 weeks";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading("p", expectedSubtext);

        // And the results heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#results > div > div > div > table > thead > tr > th:nth-child(1) > a', expectedResultsHeading);

    })

    it('user can view number of searches conducted for services in LA in past 7 days', () => {


    })

    it('user can view number of searches conducted for services in LA in past 4 weeks', () => {


    })
});