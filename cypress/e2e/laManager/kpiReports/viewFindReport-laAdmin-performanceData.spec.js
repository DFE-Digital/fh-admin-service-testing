describe('LA Man - performance data - navigate to view reports page', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('laman')
        // And I am on the Performance data for Find support for your family LA Admin page
        cy.navigateToViewFindReportsPage();
    })

    it('correct page headings displayed for find report', () => {
        const expectedPageHeading = "Performance data for Find support for your family";
        const expectedSubtext = "Data about local authority services in the Tower Hamlets Council local authority area.";
        const expectedFilterHeader = "Services performance";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading('#main-content > div.govuk-grid-row.govuk-\\!-margin-bottom-8 > div > p', expectedSubtext);

        // And the filter heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-one-quarter > h2', expectedFilterHeader);

    })

    it('user can view number of searches conducted for services in LA in past 7 days', () => {
        const expectedSubHeading = "Overall totals for Tower Hamlets Council";
        let expectedTableHeaders = ["Measure", "Number"];
        const expectedSearchesReportMetric =  "Searches";
        const expectedLast7DaysReportMetric =  "Searches in the last 7 days";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > h2:nth-child(1)', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > table:nth-child(2) > thead > tr > th:nth-child(1)', expectedTableHeaders[0]);
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > table:nth-child(2) > thead > tr > th:nth-child(2)', expectedTableHeaders[1]);

        // And the searches metric is displayed
        cy.checkElementContainsText('[data-testid="searches"]', expectedSearchesReportMetric);

        // And the past 7 days searches metric is displayed
        cy.checkElementContainsText('[data-testid="recent-searches"]', expectedLast7DaysReportMetric);

    })

    it('user can view total number of searches conducted for services in LA', () => {
        const expectedSubHeading = "Searches in the last 4 weeks";
        let expectedTableHeaders = ["Week", "Number of searches"];
        const expected4WeeksReportMetric =  "Total number of searches in the last 4 weeks";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > h2.govuk-heading-s.govuk-\\!-margin-top-9.govuk-\\!-margin-bottom-3', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > table:nth-child(4) > thead > tr > th.govuk-table__header.govuk-\\!-width-one-half', expectedTableHeaders[0]);
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-three-quarters > table:nth-child(4) > thead > tr > th:nth-child(2)', expectedTableHeaders[1]);


        // And the week 1 searches result exists
        cy.get('[data-testid="searches-week1"]').should('exist');

        // And the week 2 searches result exists
        cy.get('[data-testid="searches-week2"]').should('exist');

        // And the week 3 searches result exists
        cy.get('[data-testid="searches-week3"]').should('exist');

        // And the week 4 searches result exists
        cy.get('[data-testid="searches-week4"]').should('exist');
        
        // And the 4 week searches result is displayed
        cy.checkElementContainsText('[data-testid="searches-total"]', expected4WeeksReportMetric);

    })


});