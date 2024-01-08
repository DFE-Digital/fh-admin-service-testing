describe('DfE Admin - manage services - categories page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage services').click();
        cy.get('.govuk-table__cell a')
            .eq(0)
            .click();
        cy.clickChangeLinkForServiceCategory('Types of support offered');
    })

    it('validate support selection page content and back link', () => {
        const expectedPageHeading = "What support does the service offer?";
        let actualText = [];
        let actualCheckboxList = [];
        const checkboxList = ['Special educational needs and disabilities (SEND)', 'Autistic Spectrum Disorder (ASD)'];
        const expectedText = ["Select the categories and subcategories of support that  Autism-Friendly Cinema - Picture House provides."];
        const expectedPreviousPageHeading = 'Autism-Friendly Cinema - Picture House';

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

    it('add and remove categories to the service', () => {
        let actualCheckboxList = [];
        let actualUpdatedCheckboxList = [];
        const checkboxList = ['Special educational needs and disabilities (SEND)', 'Autistic Spectrum Disorder (ASD)', 'Early years support'];
        const newCheckboxList = ['Special educational needs and disabilities (SEND)', 'Autistic Spectrum Disorder (ASD)'];

        //Select a new sub-category
        cy.selectCheckBoxes('Early years support');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Click change for the service category
        cy.clickChangeLinkForServiceCategory('Types of support offered');
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualCheckboxList, checkboxList);
        //unselect a new sub-category
        cy.unselectCheckBoxes('Early years support');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Click change for the service category
        cy.clickChangeLinkForServiceCategory('Types of support offered');
        //check selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualUpdatedCheckboxList, newCheckboxList);
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