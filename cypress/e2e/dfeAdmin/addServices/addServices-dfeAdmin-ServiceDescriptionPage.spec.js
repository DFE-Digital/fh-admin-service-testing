describe('DfE Admin - Add services - Give a description of the service page', () => {
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
    })

    it('validate service description page content and back link', () => {
        const expectedPageHeading = "Give a description of the service";
        const expectedText = 'Provide a brief summary of the support and activities offered. You do not need to add information such as opening times and contact details at this stage.';
        const expectedServiceNameHeading = 'What support does the service offer?';
        const expectedHintText = 'You have 200 characters remaining';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check static text
        cy.checkTextOf('main#main-content p', expectedText);
        //check text area content
        cy.checkTextOf('#textarea', '');
        //check character limit text
        cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', expectedHintText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedServiceNameHeading);
    })

    it('should save the text when navigated to next page', () => {
        const expectedHeading = 'Is the support offered by this service related to children or young people?';
		const initialHintText = 'You have 200 characters remaining';
		const finalHintText = 'You have 184 characters remaining';

        //check hint text for character count with blank text box
		cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', initialHintText);
		//Enter text in the reason text area
		cy.get('#textarea').type('Test description');
		//check hint text for character count after entering the text
		cy.checkTextOf('.govuk-hint:not(.govuk-visually-hidden)', finalHintText);
		//click continue button 
		cy.get('div.govuk-grid-row button').click();
		//check page heading
		cy.checkPageHeading('h1', expectedHeading);
    })

    it('display error messages when no text is entered', ()=> {
        const emptyTextErrorMessage = ['Enter a description of the service'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
	})

    it('display error messages for exceeded character count', ()=> {
		const enteredText =	'Test description.'.repeat(12);
		const expectedHintText = 'You have 4 characters too many';
		const errorHeading = 'There is a problem';
		const errorMessage = 'Service description must be 200 characters or less';
		const expectedHeading = 'Is the support offered by this service related to children or young people?';
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
