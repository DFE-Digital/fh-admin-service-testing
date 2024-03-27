import { getDateString } from '../../../support/helperFunctions';

describe('DfE Admin - Add services - More details on when people can use this service at the location page', () => {
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
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content, checkboxes and back link', () => {
        const expectedPageHeading = "Can you provide more details about using this service at The Salvation Army?";
        const expectedStaticText = 'You could include:';
        const expectedText = ['the times of specific sessions', 'if it is only available during school holidays',
            'the room it takes place in'];
        let actualText = [];
        let actualRadioButtons = [];
        const expectedRadioButtons = ['Yes', 'No'];
        const expectedPrevPageHeading = 'On which days can people use this service at The Salvation Army?';

        //check page heading
        cy.checkPageHeading(".govuk-label-wrapper > .govuk-label", expectedPageHeading);
        //check static text
        cy.checkTextOf('.govuk-label-wrapper > p', expectedStaticText);
        cy.getTextOfElements('.govuk-label-wrapper > .govuk-list > li', actualText, expectedText)
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Select yes and continue to next page', () => {
        const expectedPageHeading = "Can you provide more details about using this service at The Salvation Army?";
        const expectedNextPageHeading = 'Locations for test service';
        const enteredText = 'More details about when people can use this service';
        const initialHintText = 'You have 300 characters remaining';
        const finalHintText = 'You have 249 characters remaining';

        //select Yes radio button
        cy.get('#UserInput_HasDetails_Yes').check();
        //check initial hint text
        cy.checkTextOf('.govuk-character-count__status', initialHintText);
        //enter text into text area
        cy.enterText('#text-area', enteredText);
        //check final hint text
        cy.checkTextOf('.govuk-character-count__status', finalHintText);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
    })

    it('Select no and continue to next page', () => {
        const expectedPageHeading = "Can you provide more details about using this service at The Salvation Army?";
        const expectedNextPageHeading = 'Locations for test service';

        //select No radio button
        cy.get('#UserInput_HasDetails_No').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
    })

    it('display error messages when no radio button is selected', () => {
        const emptyTextErrorMessage = ['Select whether you can provide more details'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display error messages when yes radio button is selected and no text is entered', () => {
        const emptyTextErrorMessage = ['Enter more details about when people can use this service at this location'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //select Yes radio button
        cy.get('#UserInput_HasDetails_Yes').check();
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display error messages when yes radio button is selected and exceeded the character limit', () => {
        const errorHeading = 'There is a problem';
        const errorMessage = 'More details about when people can use this service at this location must be 300 characters or less';
        const enteredText = 'More details about when people can use this service'.repeat(6);
        const initialHintText = 'You have 300 characters remaining';
        const finalHintText = 'You have 6 characters too many';

        //select Yes radio button
        cy.get('#UserInput_HasDetails_Yes').check();
        //check initial hint text
        cy.checkTextOf('.govuk-character-count__status', initialHintText);
        //enter text into text area
        cy.enterText('#text-area', enteredText);
        //check final hint text
        cy.checkTextOf('.govuk-character-count__status', finalHintText);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.get('.govuk-error-summary__title').should('contain', errorHeading);
        cy.get('.govuk-list > li > a').should('have.text', errorMessage);
        cy.get('#text-area-error-message').should('contain', errorMessage);
        //check hint text for character count after error message
        cy.checkTextOf('.govuk-character-count__message:not(.govuk-visually-hidden)', finalHintText);
    })

})