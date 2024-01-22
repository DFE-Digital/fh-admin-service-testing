describe('DfE Admin - Add services - Does the service cost money to use page', () => {
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
        cy.get('#text-area').type('Test description');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select No radio button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
        //Select a language
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        //click continue button 
        cy.get('form > :nth-child(5)').click();
    })

    it('validate page content, radio buttons and back link', () => {
        const expectedPageHeading = "Does the service cost money to use?";
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes, it costs money to use', 'No, it is free to use'];
        const expectedPrevPageHeading = 'Which language is the service offered in?';
        const conditionalText = 'Provide more details if you can. For example, we suggest you pay £2 every session.';
        const hintText = 'You have 150 characters remaining';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //select Yes radio button 
        cy.get('#UserInput_HasCost_Yes').click();
        //check text of conditional text area
        cy.checkTextOf('#service-cost > p', conditionalText);
        //check character count hint text
        cy.checkTextOf('.govuk-character-count__status', hintText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedPageHeading = "Does the service cost money to use?";
        const expectedNextPageHeading = 'When is the service available?';

        //select Yes radio button 
        cy.get('#UserInput_HasCost_Yes').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //verify Yes radio button is selected
        cy.get('#UserInput_HasCost_Yes').should('be.checked');
    })

    
    it('display error messages when no radio button is selected', ()=> {
        const emptyTextErrorMessage = ['Select whether it costs money to use this service'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
	})

    it('display error messages for exceeding the character count', ()=> {
		const errorHeading = 'There is a problem';
        const errorMessage = 'Cost description must be 150 characters or less';
        let [actualBannerMessages, actualMessages] = [[], []];

        //select Yes radio button and continue
        cy.get('#UserInput_HasCost_Yes').check();
        //enter text in the text area
        cy.get('#text-area').type('Test description to test the service cost page error message. Provided more details if you can. For example, we suggest you pay £2 every session tests.');
        //click continue button
        cy.get('form > .govuk-button').click();
        //check error heading
        cy.get('.govuk-error-summary__title').should('contain', errorHeading);
        //check error banner message
        cy.get('.govuk-list > li > a').should('contain', errorMessage);
        //check error message above the text area
        cy.get('#text-area-error-message').should('contain', errorMessage);
        //check character count hint text
        cy.get('.govuk-character-count__status').should('contain', 'You have 1 character too many');
    })

})