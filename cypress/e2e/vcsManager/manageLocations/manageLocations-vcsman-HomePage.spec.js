describe.skip('VCS Manager - manage locations homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Locations').click();
    })

    it('validate locations homepage content', () => {
        const expectedPageHeading = 'Elop Mentoring Locations';
        const expectedStaticText = ['View existing locations in your organisation'];
        let actualStaticText = [];
        const expectedList = ['1', '2', '⋯', '35', 'Next'];
        let actualList = [];
        const expectedHeader = ['Location', 'Location Type', ''];
        let actualHeader = [];

        //check page heading
        cy.checkPageHeading(".govuk-heading-l", expectedPageHeading)
        //check static text
        cy.getTextOfElements('.govuk-grid-column-two-thirds > p', actualStaticText, expectedStaticText);
        //check table heading
        cy.getTextOfElements('.govuk-table__header', actualHeader, expectedHeader);
        //check the total rows in the page 
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        })
        //check pagination doesn't exist
        cy.get('.govuk-pagination').should('not.exist');

    })

    it('sort by location', () => {
        //check default sort order
        cy.checkSortOrder(0, 'ascending');
        //click on Locations table header link
        cy.get('.govuk-table__header a').first().click();
        //check locations column sort order
        cy.checkSortOrder(0, 'descending');
    })

    it('sort by location type', () => {
        //check default sort order
        cy.checkSortOrder(1, 'none');
        //click on location type table header link
        cy.contains('Location Type').click();
        //check location type column sort order
        cy.checkSortOrder(1, 'ascending');
        //click on location type table header link
        cy.contains('Location Type').click();
        //check location type column sort order
        cy.checkSortOrder(1, 'descending');
    })

    it('verify back link', () => {
        const expectedPageHeading = 'Elop Mentoring';

        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-caption-l', expectedPageHeading);
    })

    it('filter locations section content', () => {
        const expectedFilterHeading = 'Filter locations';
        const expectedFilters = ['Location name'];
        let actualFilters = [];

        //check filter heading
        cy.checkPageHeading('.filters-component__heading h2', expectedFilterHeading);
        //check filter names
        cy.getTextOfElements('h3', actualFilters, expectedFilters);
        cy.get('#filters-component > .govuk-button').should('contain', 'Apply filter');
        cy.get('#filters-component > p > a').should('contain', 'Clear filter');
    })

    it('filter locations by full location name and click on clear filters', () => {

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "Tower Hamlets Council, 160 Whitechapel Road, London, E1 1BJ", '#filters-component > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
        //check pagination doesn't exist
        cy.get('.govuk-pagination').should('not.exist');
        //click on clear filter
        cy.get('#filters-component > p > a').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
    })

    it('filter locations by partial location name and click on clear filters', () => {

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "Road", '#filters-component > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
        //click on clear filter
        cy.get('#filters-component > p > a').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
    })

    it('No results found page on filter', () => {
        const resultsHeading = 'No results returned';
        let actualText = [];
        const expectedText = ['Try again by changing or removing filters you applied.'];

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "abc", '#filters-component > .govuk-button');
        //check the heading
        cy.checkPageHeading('.govuk-grid-column-three-quarters > .govuk-heading-m', resultsHeading);
        //check text under heading
        cy.getTextOfElements('.govuk-grid-column-three-quarters > p', actualText, expectedText);
        //click on clear filter
        cy.get('#filters-component > p > a').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
    })
})