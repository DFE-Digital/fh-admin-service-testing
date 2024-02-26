describe('LA Admin - Add locations - Is there anything else people need to know about this location page', () => {
    beforeEach(() => {
        const enteredAddress = new Map([
            ['line1', 'Test address 1'],
            ['townOrCity', 'Bristol'],
            ['postcode', 'LS9 8NQ']
        ]);
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.contains('Locations').click();
        cy.contains('add a new location').click();
        //enter a valid address
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Select No radio button and continue
        cy.selectRadioButtonAndContinue('#radio-False', 'div.govuk-grid-row button');
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Is there anything else people need to know about this location?";
        const expectedStaticText = ['This could include:',
            'contact information',
            'opening times',
            'if the building is wheelchair accessible',
            'how to access the location'];
        const expectedHintText = 'You have 500 characters remaining';
        const previousPageHeading = 'Is this location a family hub?'
        let actualStaticText = [];

        //check page heading 
        cy.checkPageHeading('h1', expectedPageHeading);
        //check static text 
        cy.getTextOfElements('main#main-content p, main#main-content li', actualStaticText, expectedStaticText);
        //check hint text
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', expectedHintText);
        //click on back link
        cy.clickBackLink();
        //check previous page heading
        cy.checkPageHeading('h1', previousPageHeading)
    })

    it('Enter text and navigate to check details page', () => {
        const expectedHeading = 'Check the details and add location';
        const initialHintText = 'You have 500 characters remaining';
        const finalHintText = 'You have 465 characters remaining';

        //check hint text for character count with blank text box
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', initialHintText);
        //Enter text in the text area
        cy.get('#textarea').type('Test more details about the service');
        //check hint text for character count after entering the text
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', finalHintText);
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading('h1', expectedHeading);
    })

    it('verify error message when text area exceeds 500 character limit', () => {
        const errorMessage = 'Details about this location must be 500 characters or less';
        const errorHeading = 'There is a problem';

        const enteredText = 'Test more details about the service'.repeat(15);
        const initialHintText = 'You have 500 characters remaining';
        const finalHintText = 'You have 25 characters too many';

        //check hint text for character count with blank text box
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', initialHintText);
        //Enter text in the text area
        cy.get('#textarea').type(enteredText);
        //check hint text for character count after entering the text
        cy.checkTextOf('.govuk-character-count__status', finalHintText);
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorText(errorHeading, errorMessage);
    })
})