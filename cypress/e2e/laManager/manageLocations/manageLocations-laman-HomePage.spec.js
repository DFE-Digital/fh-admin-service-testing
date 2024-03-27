describe('LA Manager - manage locations homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.contains('Locations').click();
    })

    it('validate locations homepage content', () => {
        const expectedPageHeading = 'Tower Hamlets Council Locations';
        const expectedStaticText = ['View and edit existing locations in your local authority or add a new location.'];
        let actualStaticText = [];
        const expectedHeader = ['Location', '', ''];
        let actualHeader = [];

        //check page heading
        cy.checkPageHeading(".govuk-heading-l", expectedPageHeading)
        //check static text
        cy.getTextOfElements('.govuk-grid-column-two-thirds > p', actualStaticText, expectedStaticText);
        //check table heading
        cy.getTextOfElements('.govuk-table__header', actualHeader, expectedHeader);
        //check the total rows in the page 
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        })
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

    it('Navigate to 3rd page using Next and pagination number buttons', () => {

        //click on 2nd page from pagination 
        cy.contains('li.govuk-pagination__item a', '2').click();
        //click on Next from pagination 
        cy.contains('div.govuk-pagination__next a', 'Next').click();
        //check current page on pagination
        cy.checkPaginationSelection('3');
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

    it('verify back link', () => {
        const expectedPageHeading = 'Tower Hamlets Council';

        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-caption-l', expectedPageHeading);
    })

    it('filter locations section content', () => {
        const expectedFilterHeading = 'Filter locations';
        const expectedFilters = ['Search locations', 'Type of location'];
        let actualFilters = [];
        const expectedCheckBoxes = ['Only show family hubs']
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

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "Acorn Fc, 36 Grove Park Road, Rainham, RM13 7DA", '#filters-component > .govuk-button');
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
            expect(length).to.equal(10);
        });
    })

    it('filter by location type as Only show family hubs', () => {

        //select family hub checkbox
        cy.selectCheckBoxes('Only show family hubs');
        //click on apply filters
        cy.get('#filters-component > .govuk-button').click();
        //check location type on all rows
        cy.get('.govuk-table__body > .govuk-table__row').each(($row) => {
            const rowText = $row.text().trim();
            expect(rowText).to.contains('View details');
        });
        //click on clear filter
        cy.get('#filters-component > p > a').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
    })

    it('filter by location name and location type as Only show family hubs', () => {

        //select family hub checkbox
        cy.selectCheckBoxes('Only show family hubs');
        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', "45", '#filters-component > .govuk-button');
        //check location type on 1st row
        cy.get('.govuk-table__body > :nth-child(1) > :nth-child(2)').invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal('View details');
            });
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
    })
})