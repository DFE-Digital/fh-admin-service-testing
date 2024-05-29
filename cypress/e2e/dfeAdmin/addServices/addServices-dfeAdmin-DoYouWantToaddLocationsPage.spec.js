describe('DfE Admin - Add services - Do you want to add any locations for this service page', () => {
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
    })

    it('validate page content, radio buttons and back link', () => {
        const expectedPageHeading = "Do you want to add any locations for this service?";
        const expectedStaticText = 'Let people know about any places where this service is provided. You can also add these at a later stage.';
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes', 'No'];
        const expectedPrevPageHeading = 'How can people use this service?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check hint text
        cy.checkTextOf('main#main-content p', expectedStaticText);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedPageHeading = "Do you want to add any locations for this service?";
        const expectedNextPageHeading = 'Search and select a location to add to this service';

        //select Yes radio button
        cy.get('#radio-True').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected radio buttons
        cy.get('#radio-True').should('be.checked');
    })

    it('Select No radio button and continue to next page', () => {
        const expectedPageHeading = "Do you want to add any locations for this service?";
        const expectedNextPageHeading = 'On which days can people use this service?';

        //select No radio button
        cy.get('#radio-False').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected radio buttons
        cy.get('#radio-False').should('be.checked');
    })
    
    it('display error messages when no radio button is selected', ()=> {
        const emptyTextErrorMessage = ['Select if you want to add any locations for this service'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
	})

})
