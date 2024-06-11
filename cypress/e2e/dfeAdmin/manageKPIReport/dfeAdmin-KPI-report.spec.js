describe("DfE Admin - KPI report for Find", () => {
    beforeEach(() => {
        //Login as a Dfe Admin
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        // Clicking on the view performance data hyperlink
        cy.get('a[href=\'/performance-data/Connect\']').click();
        // Click to display the Find metrics page
        cy.xpath('//a[normalize-space()=\'Find support for your family\']').click();
    })


    it('correct page headings displayed for find metrics report', () => {
        const expectedPageHeading = "Performance data for Find support for your family";
        const expectedSubtext = "Data about local authority services for Find support for your family (Find).";
        const expectedFilterHeader = "Services performance";

        // Then the page heading for the Find report is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the page subtext is displayed correctly
        cy.checkPageHeading('#main-content > div.govuk-grid-row.govuk-\\!-margin-bottom-8 > div > p', expectedSubtext);

        // And the filter heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#main-content > div:nth-child(2) > div.govuk-grid-column-one-quarter > h2', expectedFilterHeader);
    })

    it('Verify the title and content of the overall totals for Find table', () => {
        const overallTotalsTitles  = "Overall totals for Find";
        const inTheLast7DaysTitle = "Searches in the last 7 days";
        const searchesInTheLast4WeeksTitle = "Searches in the last 4 weeks";

        //verifying the overall total for find text
        cy.checkElementContainsTextXpath('//h2[normalize-space()=\'Overall totals for Find\']', overallTotalsTitles);
        //verifying the search in the last 7 days text
        cy.checkElementContainsTextXpath('//th[normalize-space()=\'Searches in the last 7 days\']', inTheLast7DaysTitle);
        //verifying the search in the last 4 weeks text
        cy.checkElementContainsTextXpath('//h2[normalize-space()=\'Searches in the last 4 weeks\']', searchesInTheLast4WeeksTitle);

        // And verify the total number of searches
        cy.get('[data-testid="searches"]').should('exist');
        // And verify searches in the last 7 days
        cy.get('[data-testid="recent-searches"]').should('exist');

        // And the week 1 searches result exists
        cy.get('[data-testid="searches-week1"]').should('exist');
        // And the week 2 searches result exists
        cy.get('[data-testid="searches-week2"]').should('exist');
        // And the week 3 searches result exists
        cy.get('[data-testid="searches-week3"]').should('exist');
        // And the week 4 searches result exists
        cy.get('[data-testid="searches-week4"]').should('exist');
    })


    it('Clicking on the back button when on the find metrics page', () => {
        //Clicking on the back button
        cy.xpath('//a[normalize-space()=\'Back\']').click();
        //Verify the title of the manage account page
        cy.title().should('eq', 'DfE Admin - Manage family support services and accounts - GOV.UK')
    })

    it('Clicking on the connect metrics performance tab', () => {
        //Click to view the Performance data for Connect families to support
        cy.xpath('//a[normalize-space()=\'Connect families to support\']').click();
        cy.title().should('eq', 'Performance data for Connect families to support - Manage family support services and accounts - GOV.UK')
    });


    it('correct page headings displayed for Connect report', () => {
        const expectedPageHeading = "Performance data for Connect families to support";
        const expectedSubtext = "Data about local authority services for Connect families to support (Connect).";
        const expectedFilterHeader = "Services performance";

        //Click to view the Performance data for Connect families to support
        cy.xpath('//a[normalize-space()=\'Connect families to support\']').click();

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

        //Click to view the Performance data for Connect families to support
        cy.xpath('//a[normalize-space()=\'Connect families to support\']').click();
        //verifying the overall total for find text
        cy.checkElementContainsTextXpath('//h2[normalize-space()=\'Overall totals for Connect\']', overallTotalsTitles);
        //verifying the search in the last 7 days text
        cy.checkElementContainsTextXpath('//h2[normalize-space()=\'Totals for the last 7 days\']', totalsForTheLast7DaysTitle);
        //verifying the search in the last 4 weeks text
        cy.checkElementContainsTextXpath('//h2[normalize-space()=\'Searches in the last 4 weeks\']', searchesInTheLast4WeeksTitle);


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
        //Click to view the Performance data for Connect families to support
        cy.xpath('//a[normalize-space()=\'Connect families to support\']').click();
        //Clicking on the back button
        cy.xpath('//a[normalize-space()=\'Back\']').click();
        //Verify the title of the manage account page
        cy.title().should('eq', 'DfE Admin - Manage family support services and accounts - GOV.UK')
    })

});