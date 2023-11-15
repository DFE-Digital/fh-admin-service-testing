describe('LA Admin - manage services homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.visit('/manage/services')
    })

    it('validate services homepage content', () => {
        const expectedPageHeading = 'Tower Hamlets Council services';
        const expectedStaticText = ['View existing services in your Local Authority.'];
        let actualStaticText = [];
        const expectedList = ['1', '2', '⋯', '35', 'Next'];
        let actualList = [];
        const expectedHeader = ['Services', ''];
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

    it('sort by services', () => {
        //check default sort order
        cy.checkSortOrder(0, 'ascending');
        //click on Services table header link
        cy.get('.govuk-table__header a').first().click();
        //check services column sort order
        cy.checkSortOrder(0, 'descending');
    })

    it('Navigate to 3rd page using Next and pagination number buttons', () => {
        const expectedList = ['Previous', '1', '2', '3', '4', '⋯', '35', 'Next'];
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
        const expectedList = ['1', '2', '⋯', '35', 'Next'];
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
        const expectedPageHeading = 'Tower Hamlets Council';

        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-caption-l', expectedPageHeading);
    })
})