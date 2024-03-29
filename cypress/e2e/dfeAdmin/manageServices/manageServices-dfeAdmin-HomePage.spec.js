﻿describe('DfE Admin - manage services homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage services').click();
    })

    it('validate services homepage content', () => {
        const expectedPageHeading = 'Services';
        const expectedStaticText = ['View existing services for Local Authorities and VCS organisations.', 'Clear filter'];
        let actualStaticText = [];
        const expectedHeader = ['Services'];
        let actualHeader = [];

        //check page heading
        cy.checkPageHeading(".govuk-heading-l", expectedPageHeading)
        //check static text
        cy.getTextOfElements('main#main-content p', actualStaticText, expectedStaticText);
        //check table heading
        cy.getTextOfElements('.govuk-table__header a', actualHeader, expectedHeader);
        //check the total rows in the page 
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        })
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
        const expectedPageHeading = 'Department for Education';

        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-caption-l', expectedPageHeading);
    })

    it('filter services section content', () => {
        const expectedFilterHeading = 'Filter services';
        const serviceNameText = 'Service name';

        //check filter heading
        cy.checkPageHeading('.moj-filter__heading-title h2', expectedFilterHeading);
        cy.get('.govuk-fieldset__legend').should('contain', 'Service name');
        cy.get('.moj-filter__selected > .govuk-button').should('contain', 'Apply filter');
        cy.get('.fh-button-link').should('contain', 'Clear filter');
    })

    it('filter services by full service name and click on clear filter', () => {

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#service-name', 'City Wellbeing Practice', '.moj-filter__selected > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
        //check pagination doesn't exist
        cy.get('.govuk-pagination').should('not.exist');
        //click on clear filter
        cy.get('.fh-button-link').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
    })

    it('filter services by partial service name and click on clear filter', () => {

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#service-name', 'Play', '.moj-filter__selected > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
        //click on clear filter
        cy.get('.fh-button-link').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(10);
        });
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
})