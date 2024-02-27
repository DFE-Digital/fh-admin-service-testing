describe('DfE Admin - Add services - Can children or young people access the page', () => {
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
    })

    it('validate page content, No radio button and back link', () => {
        const expectedPageHeading = "Is the support offered by this service related to children or young people?";
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes', 'No'];
        const expectedNextPageHeading = 'Which language is the service offered in?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //select No radio button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //verify No radio button is selected
        cy.get('#ViewModel_Children_No').should('be.checked');
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedPageHeading = "Is the support offered by this service related to children or young people?";
        const expectedNextPageHeading = 'Which language is the service offered in?';

        //Select Yes radio button, age range and continue
        cy.selectYesRadioButtonAndAgeRange('2 years old', '5 years old');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //verify Yes radio button is selected
        cy.get('#ViewModel_Children_Yes').should('be.checked');
        //Verify selected age range values
        cy.get('#ViewModel_FromAge').should('have.value', '2');
        cy.get('#ViewModel_ToAge').should('have.value', '5');
    })

    
    it('display error messages when no radio button is selected', ()=> {
        const emptyTextErrorMessage = ['Select yes if the support offered by this service is related to children or young people'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
	})

    it('display error messages for no age range selection', ()=> {
		const errorHeading = 'There is a problem';
		const errorMessage = ['Select age from', 'Select age to'];
		const expectedHeading = 'Is the support offered by this service related to children or young people?';
        let [actualBannerMessages, actualMessages] = [[], []];

        //select Yes radio button and continue
        cy.selectRadioButtonAndContinue('#ViewModel_Children_Yes', 'div.govuk-grid-row button');
		//check error banner
		cy.checkErrorBannerAndMessages(errorHeading, errorMessage, actualBannerMessages, actualMessages);
    })

    it('display error message for same from and to age values', () => {
        const errorHeading = 'There is a problem';
        const errorMessage = ['Ages from and to cannot be the same'];
        const expectedHeading = 'Is the support offered by this service related to children or young people?';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Select Yes radio button, age range and continue
        cy.selectYesRadioButtonAndAgeRange('2 years old', '2 years old');
        //check error banner
        cy.checkErrorBannerAndMessages(errorHeading, errorMessage, actualBannerMessages, actualMessages);
    })

    it('display error message for from age greater than to age', () => {
        const errorHeading = 'There is a problem';
        const errorMessage = ['The selected age to is lower than the age from'];
        const expectedHeading = 'Is the support offered by this service related to children or young people?';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Select Yes radio button, age range and continue
        cy.selectYesRadioButtonAndAgeRange('2 years old', '1 year old');
        //check error banner
        cy.checkErrorBannerAndMessages(errorHeading, errorMessage, actualBannerMessages, actualMessages);
    })
})