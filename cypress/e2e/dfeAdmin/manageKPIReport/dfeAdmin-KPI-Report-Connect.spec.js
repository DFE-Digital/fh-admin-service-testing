describe("DfE Admin - KPI report for Connect", () => {
    beforeEach(() => {
        //Login as a Dfe Admin
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        // Clicking on the view performance data hyperlink
        cy.get('a[href=\'/performance-data/Connect\']').click();

    })



    it('Verifying the default metrics performance report', () => {
        //Verifying the default metrics page is connect
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


    it('Verify the title and content of the overall totals for Connect table', () => {
            const overallTotalsTitles  = "Overall totals for Connect";
            const totalsForTheLast7DaysTitle = "Totals for the last 7 days";
            const searchesInTheLast4WeeksTitle = "Searches in the last 4 weeks";

        //verifying the overall total for find text
        cy.checkElementContainsText('[data-testid="h2-overall"]', overallTotalsTitles);
        //verifying the search in the last 7 days text
        cy.checkElementContainsText('[data-testid="h2-daily"]', totalsForTheLast7DaysTitle);
        //verifying the search in the last 4 weeks text
        cy.checkElementContainsText('[data-testid="h2-weekly"]', searchesInTheLast4WeeksTitle);


        // And the overall connect searches
        cy.get('[data-testid="overall-searches"]').should('exist');
        // And the number of searches in the last 7 days
        cy.get('[data-testid="recent-searches"]').should('exist');

        // And the week 1 searches result exists
        cy.get('[data-testid="breakdown-week1"]').should('exist');
        // And the week 2 searches result exists
        cy.get('[data-testid="breakdown-week2"]').should('exist');
        // And the week 3 searches result exists
        cy.get('[data-testid="breakdown-week3"]').should('exist');
        // And the week 4 searches result exists
        cy.get('[data-testid="breakdown-week4"]').should('exist');
    })

    it('Clicking on the back button when on the connect metrics page', () => {
        //Click on back link
        cy.clickBackLink();
        //Verify the title of the manage account page
        cy.title().should('eq', 'DfE Admin - Manage family support services and accounts - GOV.UK')
    })

});