describe.skip('VCS Admin - manage services homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Services').click();
    })

    it('validate services homepage content', () => {
        const expectedPageHeading = 'Elop Mentoring services';
        const expectedStaticText = ['View existing services in your VCS organisation.'];
        let actualStaticText = [];
        const expectedList = ['1', '2', '⋯', '35', 'Next'];
        let actualList = [];
        const expectedHeader = ['Services', 'Actions'];
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

    it('verify back link', () => {
        const expectedPageHeading = 'Elop Mentoring';

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
        cy.enterTextAndContinue('#service-name', 'Elop Mentoring', '.moj-filter__selected > .govuk-button');
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
            expect(length).to.equal(1);
        });
    })

    it('filter services by partial service name and click on clear filter', () => {

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#service-name', 'Ment', '.moj-filter__selected > .govuk-button');
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
        //click on clear filter
        cy.get('.fh-button-link').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
    })

    it('No results found page on filter', () => {
        const resultsHeading = 'No results found';
        let actualText = [];
        const expectedText = ['Try again by searching for another service.'];

        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#service-name', 'abc', '.moj-filter__selected > .govuk-button');
        //check the heading
        cy.checkPageHeading('#results h2', resultsHeading);
        //check filtered pagination items
        cy.getTextOfElements('#results p', actualText, expectedText);
        //click on clear filter
        cy.get('.fh-button-link').click();
        //check the total number of rows in the page
        cy.get('tbody.govuk-table__body tr.govuk-table__row').its('length').then((length) => {
            expect(length).to.equal(1);
        });
    })
})