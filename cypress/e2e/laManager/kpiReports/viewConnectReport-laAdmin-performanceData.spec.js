describe('LA Man - performance data - navigate to view reports page', () => {
    beforeEach(() => {
        // Given I am logged in as VCS admin
        cy.visit('/')
        cy.integrationLogin('laman')
        // And I am on the Performance data for Connect support for your family VCS Admin page
        cy.navigateToViewConnectReportsPage();
    })

    it('correct page headings displayed for connect report', () => {
        const expectedPageHeading = "Performance data for Connect families to support";
        const expectedSubtext = "Data about voluntary and community sector (VCS) services in the Tower Hamlets Council local authority area.";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading('#main-content > div.govuk-grid-row.govuk-\\!-margin-bottom-8 > div > p', expectedSubtext);
    })

    it('user can view overall search totals and connections requests sent by VCS services within an LA', () => {
        const expectedSubHeading = "Overall totals for Tower Hamlets Council";
        let expectedTableHeaders = ["Measure", "Number"];
        const expectedSearchesReportMetric =  "Searches";
        const expectedConnectionRequestsReportMetric =  "Connection requests sent";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-overall"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-measure-overall"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-overall"]', expectedTableHeaders[1]);

        // And the searches and connection request metrics are displayed
        cy.checkElementContainsText('[data-testid="overall-searches"]', expectedSearchesReportMetric);
        cy.checkElementContainsText('[data-testid="overall-requests-sent"]', expectedConnectionRequestsReportMetric);
    })


    it('user can view search totals and connections requests sent by VCS services within an LA in the past 7 days', () => {
        const expectedSubHeading  = "Totals for the last 7 days";
        let expectedTableHeaders = ["Measure", "Number"];
        const expectedSearchesReportMetric =  "Searches";
        const expectedConnectionRequestsReportMetric =  "Connection requests sent";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-daily"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-measure-daily"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-daily"]', expectedTableHeaders[1]);

        // And the past 7 days searches and connection requests metrics are displayed
        cy.checkElementContainsText('[data-testid="recent-searches"]', expectedSearchesReportMetric);
        cy.checkElementContainsText('[data-testid="recent-requests-sent"]', expectedConnectionRequestsReportMetric);

    })

    it('user can view search totals and connections requests sent by VCS services within an LA in the last 4 weeks', () => {
        const expectedSubHeading = "Searches and connection requests in the last 4 weeks";
        let expectedTableHeaders = ["Week", "Number of searches", "Connection requests sent"];
        const expected4WeeksReportMetric =  "Total";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-weekly"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-week-weekly"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-of-searches-weekly"]', expectedTableHeaders[1]);
        cy.checkPageHeading('[data-testid="th-number-of-requests-made-weekly"]', expectedTableHeaders[2]);


        // And the week 1 searches result exists
        cy.get('[data-testid="breakdown-week1"]').should('exist');

        // And the week 2 searches result exists
        cy.get('[data-testid="breakdown-week2"]').should('exist');

        // And the week 3 searches result exists
        cy.get('[data-testid="breakdown-week3"]').should('exist');

        // And the week 4 searches result exists
        cy.get('[data-testid="breakdown-week4"]').should('exist');
        
        // And the 4 week searches result is displayed
        cy.checkElementContainsText('[data-testid="breakdown-total"]', expected4WeeksReportMetric);

    })
});