describe('DfE Admin - manage services - view services list', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('dfeadmin')

        // And I am on the view services page
        cy.navigateToViewServicesPage()

    })

    it('displays a list of services', () => {
        const expectedPageHeading = "Services";

        // Then the page heading is displayed correctly
        cy.checkPageHeading("h1", expectedPageHeading);

        // And the results heading is displayed correctly - the xpath could not be helped there are no ids/data test ids
        cy.checkPageHeading('#results > div > div > div > table > thead > tr > th:nth-child(1) > a', expectedPageHeading);

        // And the results are displayed
        cy.get('[id="results"]').should('exist');
    })

    it('the save button should not be displayed', () => {


        // Then the save button is not displayed
        cy.get('#main-content > div > div > form > button').should('not.exist');
    })

    it('can apply filters on results', () => {

        // When I apply a filter
        cy.get('[id="service-name"]').type('Test');
        cy.get('[type="submit"]').contains('Apply filter').click();

        // Then the results are displayed
        cy.get('[id="results"]').should('exist');
        cy.get('[id="results"]').contains('test');
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        })

    })

    it('can navigate back to homepage', () => {
        const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/Welcome";

        // When I click the back button
        cy.clickBackLink();

        // Then I am navigated back to the homepage
        cy.checkPageUrl(expectedPageUrl);

    })

    it('No results found page on filter', () => {
        const resultsHeading = 'No results found';
        let actualText = [];
        const expectedText = ['Try again by searching for another service.'];

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#service-name', 'abcdef', '.moj-filter__selected > .govuk-button');
        //check the heading
        cy.checkPageHeading('#results h2', resultsHeading);
        //check filtered pagination items
        cy.getTextOfElements('#results p', actualText, expectedText);
        //click on clear filter
        cy.get('.fh-button-link').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
    })

    it('Navigate to a page using Previous button', () => {

        //click on 2nd page from pagination 
        cy.contains('li.govuk-pagination__item a', '2').click();
        //check current page on pagination
        cy.checkPaginationSelection('2');
        //click on Previous from pagination 
        cy.contains('div.govuk-pagination__prev', 'Previous').click();
        //check current page on pagination
        cy.checkPaginationSelection('1');
    })

    it('sort by services', () => {
        //check default sort order
        cy.checkSortOrder(0, 'ascending');
        //click on Services table header link
        cy.get('.govuk-table__header a').first().click();
        //check services column sort order
        cy.checkSortOrder(0, 'descending');
    })
});