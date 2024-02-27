describe('DfE Admin - manage services - service cost page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage services').click();
        cy.enterTextAndContinue('#service-name', 'Deaf', '.moj-filter__selected > .govuk-button');
        cy.get('.govuk-table__cell a')
            .eq(0)
            .click();
        cy.clickChangeLinkForServiceCategory('Cost');
    })

    it('validate page content', () => {
        const expectedPageHeading = "Does the service cost money to use?";
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes, it costs money to use', 'No, it is free to use'];
        const conditionalText = 'Provide more details if you can. For example, we suggest you pay £2 every session.';
        const hintText = 'You have 150 characters remaining';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //verify No radio button is selected
        cy.get('#UserInput_HasCost_No').should('be.checked');
        //select Yes radio button 
        cy.get('#UserInput_HasCost_Yes').click();
        //check text of conditional text area
        cy.checkTextOf('#service-cost > p', conditionalText);
        //check character count hint text
        cy.checkTextOf('.govuk-character-count__status', hintText);
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedPageHeading = "Is the support offered by this service related to children or young people?";

        //select Yes radio button 
        cy.get('#UserInput_HasCost_Yes').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //click on change service cost link
        cy.clickChangeLinkForServiceCategory('Cost');
        //verify Yes radio button is selected
        cy.get('#UserInput_HasCost_Yes').should('be.checked');
        //select No radio button 
        cy.get('#UserInput_HasCost_No').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('display error messages for exceeding the character count', () => {
        const errorHeading = 'There is a problem';
        const errorMessage = ['Cost description must be 150 characters or less'];
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
});