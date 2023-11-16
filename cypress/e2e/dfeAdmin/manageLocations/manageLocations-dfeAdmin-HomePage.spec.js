describe('DfE Admin - manage locations homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.visit('/locations/managelocations')
    })

    it('validate locations homepage content', () => {
        const expectedPageHeading = 'Locations';
        const expectedStaticText = ['View existing locations'];
        let actualStaticText = [];
        const expectedList = ['1', '2', '⋯', '39', 'Next'];
        let actualList = [];
        const expectedHeader = ['Location', 'Location Type', ''];
        let actualHeader = [];

        //check page heading
        cy.checkPageHeading(".govuk-heading-l", expectedPageHeading)
        //check static text
        cy.getTextOfElements('main#main-content p', actualStaticText, expectedStaticText);
        //check table heading
        cy.getTextOfElements('.govuk-table__header', actualHeader, expectedHeader);
        //check the total rows in the page 
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        })
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
        //check current page on pagination
        cy.checkPaginationSelection('1');
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

    it('Navigate to 3rd page using Next and pagination number buttons', () => {
        const expectedList = ['Previous', '1', '2', '3', '4', '⋯', '39', 'Next'];
        let actualList = [];

        //click on 2nd page from pagination 
        cy.contains('li.govuk-pagination__item a', '2').click();
        //click on Next from pagination 
        cy.contains('div.govuk-pagination__next a', 'Next').click();
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
        //check current page on pagination
        cy.checkPaginationSelection('3');
    })

    it('Navigate to a page using Previous button', () => {
        const expectedList = ['1', '2', '⋯', '39', 'Next'];
        let actualList = [];

        //click on 2nd page from pagination 
        cy.contains('li.govuk-pagination__item a', '2').click();
        //check current page on pagination
        cy.checkPaginationSelection('2');
        //click on Previous from pagination 
        cy.contains('div.govuk-pagination__prev', 'Previous').click();
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
        //check current page on pagination
        cy.checkPaginationSelection('1');
    })

    it('verify back link', () => {
        const expectedPageHeading = 'Department for Education';

        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-caption-l', expectedPageHeading);
    })

    it('filter locations section content', () => {
        const expectedFilterHeading = 'Filter locations';
        const expectedFilters = ['Location name', 'Location type'];
        let actualFilters = [];
        const expectedCheckBoxes = ['Family hub', 'Non family hub']
        let actualCheckBoxes = [];

        //check filter heading
        cy.checkPageHeading('.filters-component__heading h2', expectedFilterHeading);
        //check filter names
        cy.getTextOfElements('h3', actualFilters, expectedFilters);
        //checkboxes text
        cy.getTextOfElements('.govuk-checkboxes__label', actualCheckBoxes, expectedCheckBoxes);
        cy.get('#filters-component > .govuk-button').should('contain', 'Apply filter');
        cy.get('#filters-component > p > a').should('contain', 'Clear filter');
    })

    it('filter locations by full location name and click on clear filters', () => {
        const expectedList = ['1', '2', '⋯', '39', 'Next'];
        let actualList = [];

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "Backfields House, Upper York St, St Paul's, BS2 8QJ", '#filters-component > .govuk-button');
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
            expect(length).to.equal(10);
        });
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
    })

    it('filter locations by partial location name and click on clear filters', () => {
        const expectedList = ['1', '2', '⋯', '39', 'Next'];
        const filteredList = ['1', '2', '⋯', '5', 'Next'];
        let actualList = [];
        let actualFinalList = [];
        let actualFilterList = [];

        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "House", '#filters-component > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
        //check filtered pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualFilterList, filteredList);
        //click on clear filter
        cy.get('#filters-component > p > a').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualFinalList, expectedList);
    })

    it('No results found page on filter', () => {
        const expectedList = ['1', '2', '⋯', '39', 'Next'];
        const resultsHeading = 'No results returned';
        let actualList = [];
        let actualFinalList = [];
        let actualText = [];
        const expectedText = ['Try again by changing or removing filters you applied.'];

        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualList, expectedList);
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
            expect(length).to.equal(10);
        });
        //check pagination items
        cy.getTextOfElements('.govuk-pagination li, .govuk-pagination div', actualFinalList, expectedList);
    })
})