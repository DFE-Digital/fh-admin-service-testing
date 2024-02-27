describe('VCS Manager - manage services - Categories page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Services').click();
        cy.get('.govuk-table__cell a')
            .eq(0)
            .click();
        cy.clickChangeLinkForServiceCategory('Support it offers');
    })

    it('validate support selection page content and back link', () => {
        const expectedPageHeading = "What support does the service offer?";
        let actualText = [];
        let actualCheckboxList = [];
        const checkboxList = ['Family support', 'Parenting support'];
        const expectedText = ["Select the categories and subcategories of support that Elop Mentoring provides."];
        const expectedPreviousPageHeading = 'Service details';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check text box content
        cy.getTextOfElements('form > p', actualText, expectedText);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualCheckboxList, checkboxList);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPreviousPageHeading);
    })

    it('Check error message when no sub-category is selected', () => {
        const checkboxList = ['Activities, clubs and groups'];
        const errorHeading = 'There is a problem';
        const errorMessages = ['Select name of sub-category support'];
        let [actualBannerMessages, actualMessages] = [[], []];

        //select checkboxes
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })
});