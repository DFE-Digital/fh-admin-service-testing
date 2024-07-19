describe("DfE Admin - KPI report for Connect", () => {
    beforeEach(() => {
        //Login as a Dfe Admin
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        // Clicking on the view performance data hyperlink
        cy.get('a[href=\'/performance-data/Connect\']').click();

    })



    it('Verifying the default metrics performance report', () => {
        //Verifying the default metrics page is connect by checking page title
        cy.title().should('eq', 'Performance data for Connect families to support - Manage family support services and accounts - GOV.UK')
    });


    it('Correct page headings displayed for Connect report', () => {
        const expectedPageHeading = "Performance data for Connect families to support";
        const expectedSubtext = "Data about local authority services for Connect families to support (Connect).";
        const expectedFilterHeader = "Services performance";


        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading('#main-content > div.govuk-grid-row.govuk-\\!-margin-bottom-8 > div > p', expectedSubtext);

        // And the filter heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-one-quarter > h2', expectedFilterHeader);
    })


    it('user can view overall number of searches and connections requests for a LA', () => {
        const expectedSubHeading = "Overall totals for Connect";
        let expectedTableHeaders = ["Measure", "Number"];
        const expectedSearchesReportMetric =  "Searches";
        const expectedConnectionRequestsReportMetric =  "Connection requests sent";
        const expectedConnectionRequestsAcceptedReportMetric =  "Connection requests accepted";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-overall"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-measure-overall"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-overall"]', expectedTableHeaders[1]);

        // And the searches and connection request metrics are displayed
        cy.checkElementContainsText('[data-testid="overall-searches"]', expectedSearchesReportMetric);
        cy.checkElementContainsText('[data-testid="overall-requests-sent"]', expectedConnectionRequestsReportMetric);
        cy.checkElementContainsText('[data-testid="overall-requests-accepted"]', expectedConnectionRequestsAcceptedReportMetric);
    })

    it('user can view number of searches and connections requests for an LA in past 7 days', () => {
        const expectedSubHeading  = "Totals for the last 7 days";
        let expectedTableHeaders = ["Measure", "Number"];
        const expectedSearchesReportMetric =  "Searches";
        const expectedConnectionRequestsReportMetric =  "Connection requests sent";
        const expectedConnectionRequestsAcceptedReportMetric =  "Connection requests accepted";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-daily"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-measure-daily"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-daily"]', expectedTableHeaders[1]);

        // And the past 7 days searches and connection requests metrics are displayed
        cy.checkElementContainsText('[data-testid="recent-searches"]', expectedSearchesReportMetric);
        cy.checkElementContainsText('[data-testid="recent-requests-sent"]', expectedConnectionRequestsReportMetric);
        cy.checkElementContainsText('[data-testid="recent-requests-accepted"]', expectedConnectionRequestsAcceptedReportMetric);
    })

    it('user can view number of searches and connections requests for an LA in the past 4 weeks', () => {
        const expectedSubHeading = "Searches and connection requests in the last 4 weeks";
        let expectedTableHeaders = ["Week", "Number of searches", "Connection requests sent", "Connection requests accepted"];
        const expected4WeeksReportMetric =  "Total";

        // Then the page heading for the Connect report is displayed correctly
        cy.checkPageHeading('[data-testid="h2-weekly"]', expectedSubHeading);

        // And the expected table headers are displayed correctly
        cy.checkPageHeading('[data-testid="th-week-weekly"]', expectedTableHeaders[0]);
        cy.checkPageHeading('[data-testid="th-number-of-searches-weekly"]', expectedTableHeaders[1]);
        cy.checkPageHeading('[data-testid="th-number-of-requests-made-weekly"]', expectedTableHeaders[2]);
        cy.checkPageHeading('[data-testid="th-number-of-requests-accepted-weekly"]', expectedTableHeaders[3]);


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

    it('Clicking on the back button when on the connect metrics page', () => {
        //Click on back link
        cy.clickBackLink();
        //Verify the title of the manage account page
        cy.title().should('eq', 'DfE Admin - Manage family support services and accounts - GOV.UK')
    })

});