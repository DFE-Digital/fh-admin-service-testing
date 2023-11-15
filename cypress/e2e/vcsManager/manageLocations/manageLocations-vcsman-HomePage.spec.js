describe.skip('VCS Manager - manage locations homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.visit('/locations/managelocations')
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
        cy.getTextOfElements('main#main-content p', actualStaticText, expectedStaticText);
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
})