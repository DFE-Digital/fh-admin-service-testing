describe('DfE Admin - Add services - Give more details about this service page', () => {
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
        //select No radio button
        cy.get('#radio-False').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select No radio button
        cy.get('#UserInput_HasDetails_No').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select Email checkbox
        cy.selectCheckBoxes('Email');
        //enter email address
        cy.enterText('#email-text-box', 'a@test.com');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content, checkboxes and back link', () => {
        const expectedPageHeading = "Give more details about this service";
        const expectedStaticText = 'Tell people anything else they need to about using this service, such as:';
        const expectListText = ['different age ranges for people whith special educational needs and disabilities ( SEND )',
            'if they need to book and how to do this', 'any accessibility support offered'];
        let actualList = [];
        const expectedPrevPageHeading = 'How can people find out more about this service?';
        const expectedHintText = 'You have 500 characters remaining';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check static text
        cy.checkTextOf('.govuk-grid-column-two-thirds > p', expectedStaticText);
        //check text on the page
        cy.getTextOfElements('.govuk-list > li', actualList, expectListText);
        //check text area content
        cy.checkTextOf('#textarea', '');
        //check character limit text
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', expectedHintText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPrevPageHeading);
    })

    it('should save the text when navigated to next page', () => {
        const expectedHeading = 'Check the details and add service';
        const initialHintText = 'You have 500 characters remaining';
        const finalHintText = 'You have 483 characters remaining';

        //check hint text for character count with blank text box
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', initialHintText);
        //Enter text in the reason text area
        cy.get('#textarea').type('Test more details');
        //check hint text for character count after entering the text
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', finalHintText);
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading('h1', expectedHeading);
        //Click on back link
        cy.clickBackLink();
        //check saved text
        cy.checkTextOf('#textarea', 'Test more details');
    })

    it('Navigate to next page with out entering more details', () => {
        const expectedHeading = 'Check the details and add service';
        const initialHintText = 'You have 500 characters remaining';

        //check hint text for character count with blank text box
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', initialHintText);
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading('h1', expectedHeading);
        //Click on back link
        cy.clickBackLink();
        //check saved text
        cy.checkTextOf('#textarea', '');
    })

    it('display error messages for exceeded character count', () => {
        const enteredText = 'Test more details about this service.'.repeat(20);
        const expectedHintText = 'You have 240 characters too many';
        const errorHeading = 'There is a problem';
        const errorMessage = 'More details must be 500 characters or less';
        const expectedHeading = 'Check the details and add service';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Enter text in the reason text area
        cy.get('#textarea').type(enteredText);
        //check hint text for character count
        cy.checkTextOf('.govuk-character-count__message:not(.govuk-visually-hidden)', expectedHintText);
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.get('.govuk-error-summary__title').should('contain', errorHeading);
        cy.get('.govuk-list > li > a').should('have.text', errorMessage);
        cy.get('#textarea-error-message').should('contain', errorMessage);
        //check hint text for character count after error message
        cy.checkTextOf('.govuk-character-count__message:not(.govuk-visually-hidden)', expectedHintText);
        //Enter text in the reason text area
        cy.get('#textarea').clear().type('Test description');
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading('h1', expectedHeading);
    })

})
