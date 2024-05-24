import { getDateString } from '../../../support/helperFunctions';

describe('DfE Admin - Add services - Locations for this service page', () => {
    var n = getDateString();
    const addressline1 = 'Test address' + n;

    beforeEach(() => {
        const checkboxList = ['Activities, clubs and groups', 'Holiday clubs and schemes'];
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        // Search and select a local authority, then continue
        cy.get('#select').type("Salford City Council");
        cy.get('#select__option--0').click();
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
        cy.selectCheckBoxes('Monday');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select Yes radio button
        cy.get('#UserInput_HasDetails_Yes').check();
        //enter text into text area
        cy.enterText('#text-area', 'More details about when people can use this service');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Locations for test service";
        const expectedStaticText = 'These locations will be added to this service.';
        const expectedPrevPageHeading = 'Can you provide more details about using this service at The Salvation Army?';
        const keyValuePairs =
        {
            'Address': 'The Salvation Army\r\n15\nClements Road\r\nIlford\r\nEssex\r\nIG1 1BH' ,
            'Family hub' : 'No' ,
            'Location details' : 'test' ,
            'Days service is available': 'Monday' ,
            'Service availability details':'More details about when people can use this service' };

        const title1 = 'Location 1';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check static text
        cy.checkTextOf('.govuk-grid-column-two-thirds > p', expectedStaticText);
        //check card details
        cy.checkLocationCardDetails(keyValuePairs, title1);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPrevPageHeading);

    })

    it('validate location can be removed', () => {
        const expectedRemoveLocationPageHeading = "Do you want to remove";
        const expectedSuccessfulRemoveLocationPageHeading = "How can people use this service?";

        //Click on remove locations link
        cy.clickRemoveLocationsLink();
        //verify page heading
        cy.get('[class=govuk-fieldset__heading]').contains(expectedRemoveLocationPageHeading);

        //Click yes radio button
        cy.get('[id=radio-True]').click();

        //Click Continue
        cy.get('[type=submit]').click();

        // verify page heading
        cy.get('[class=govuk-fieldset__heading]').contains(expectedSuccessfulRemoveLocationPageHeading);
    })

    it('validate location is not removed', () => {
        const expectedRemoveLocationPageHeading = "Do you want to remove";
        const expectedLocationsPageHeading = "Locations for test service";

        //Click on remove locations link
        cy.clickRemoveLocationsLink();
        //verify page heading
        cy.get('[class=govuk-fieldset__heading]').contains(expectedRemoveLocationPageHeading);

        //Click yes radio button
        cy.get('[id=radio-False]').click();

        //Click Continue
        cy.get('[type=submit]').click();

        // verify page heading
        cy.checkPageHeading("h1", expectedLocationsPageHeading);
    })

})
