describe('DfE Admin - Add locations - Is this location a family hub page', () => {
    beforeEach(() => {
        const enteredAddress = new Map([
            ['line1', 'Test address 1'],
            ['townOrCity', 'Bristol'],
            ['postcode', 'LS9 8NQ']
        ]);
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a location').click();
        //enter a valid address
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Is this location a family hub?";
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes', 'No'];
        const expectedPreviousPageHeading = 'What is the address?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //click on back link
        cy.clickBackLink();
        //check page heading
        cy.checkPageHeading("h1", expectedPreviousPageHeading);
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedPageHeading = "Is this location a family hub?";
        const expectedNextPageHeading = 'Is there anything else people need to know about this location?';

        //Select Yes radio button and continue
        cy.selectRadioButtonAndContinue('#radio-True', 'div.govuk-grid-row button');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //verify Yes radio button is selected
        cy.get('#radio-True').should('be.checked');
    })

    it('Select No radio button and continue to next page', () => {
        const expectedPageHeading = "Is this location a family hub?";
        const expectedNextPageHeading = 'Is there anything else people need to know about this location?';

        //Select No radio button and continue
        cy.selectRadioButtonAndContinue('#radio-False', 'div.govuk-grid-row button');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //verify No radio button is selected
        cy.get('#radio-False').should('be.checked');
    })

    it('verify error message when no radio button is selected', () => {
        const emptyTextErrorMessage = ['Select if location is a family hub'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })
})