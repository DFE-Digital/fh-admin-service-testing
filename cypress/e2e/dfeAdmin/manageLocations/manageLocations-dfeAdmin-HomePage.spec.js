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
})