import { getDateString } from '../../../support/helperFunctions';

describe('DfE Admin - Add services - On which days can people use this service at this location', () => {
    var n = getDateString();
    const addressline1 = 'Test address' + n;

    beforeEach(() => {
        const checkboxList = ['Activities, clubs and groups', 'Holiday clubs and schemes'];
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //enter a service name
        cy.enterTextAndContinue('.govuk-input', 'test service', 'div.govuk-grid-row button');
        //Select a category
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Enter text in the reason text area
        cy.get('#textarea').type('Test description');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select No radio button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
        //Select a language
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        //click continue button 
        cy.get('form > :nth-child(5)').click();
        //select No radio button 
        cy.get('#UserInput_HasCost_No').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select In person checkbox
        cy.selectCheckBoxes('In person');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select Yes radio button
        cy.get('#radio-True').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //enter postcode and continue
        cy.enterText('#select-location-location', 'IG1 1BH');
        //click on location
        cy.get('#select-location-location__option--0').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content, checkboxes and back link', () => {
        const expectedPageHeading = "On which days can people use this service at The Salvation Army?";
        const expectedStaticText = 'Let people know about the days when this service is available here. You can provide more specific details about availability on the next page.';
        const expectedHintText = 'Select all options that apply. If none apply or you do not know these yet, leave blank and click continue.';
        const expectedSubHeading = 'Select any days when this service is available at this location';
        let actualText = [];
        const expectedText = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const expectedPrevPageHeading = 'Search and select a location to add to this service';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check sub heading
        cy.checkPageHeading(".govuk-fieldset__heading", expectedSubHeading);
        //check static text
        cy.checkTextOf('main#main-content p', expectedStaticText);
        //check hint text
        cy.checkTextOf('.govuk-hint', expectedHintText);
        //check box content
        cy.getvisibleTextOfElements(".govuk-checkboxes__label", actualText, expectedText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Select all days and continue to next page', () => {
        const expectedPageHeading = "On which days can people use this service at The Salvation Army?";
        const expectedNextPageHeading = 'Can you provide more details about using this service at The Salvation Army?';
        const expectedCheckBoxes = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let actualCheckBoxes = [];

        //select all days
        expectedCheckBoxes.forEach((day) => {
            cy.selectCheckBoxes(day);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualCheckBoxes, expectedCheckBoxes);
    })
    
    it('Do not select any checkbox and continue to next page', ()=> {
        const expectedNextPageHeading = 'Can you provide more details about using this service at The Salvation Army?';

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedNextPageHeading);
	})

})