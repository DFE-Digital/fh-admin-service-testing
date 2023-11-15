describe('VCS Admin - manage services homepage', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.visit('/manage/services')
    })

    it('validate services homepage content', () => {
        const expectedPageHeading = 'Elop Mentoring services';
        const expectedStaticText = ['View existing services in your VCS organisation.'];
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
})