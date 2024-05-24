describe('DfE Admin - Add services - How can people use this service page', () => {
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
    })

    it('validate page content, check boxes and back link', () => {
        const expectedPageHeading = "How can people use this service?";
        const expectedHintText = 'Select all options that apply.';
        let actualText = [];
        let expectedText = ['In person', 'Online', 'Telephone'];
        const expectedPrevPageHeading = 'Does the service cost money to use?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check hint text
        cy.checkTextOf('.govuk-hint', expectedHintText);
        //check box content
        cy.getvisibleTextOfElements(".govuk-checkboxes__label", actualText, expectedText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Select In person checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people use this service?";
        const expectedNextPageHeading = 'Do you want to add any locations for this service?';
        const checkBoxList = ['In person'];
        let actualList = [];

        //select In person checkbox
        cy.selectCheckBoxes('In person');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select Online checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people use this service?";
        const expectedNextPageHeading = 'On which days can people use this service?';
        const checkBoxList = ['Online'];
        let actualList = [];

        //select Online checkbox
        cy.selectCheckBoxes('Online');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select Telephone checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people use this service?";
        const expectedNextPageHeading = 'On which days can people use this service?';
        const checkBoxList = ['Telephone'];
        let actualList = [];

        //select Telephone checkbox
        cy.selectCheckBoxes('Telephone');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select all checkboxes and continue to next page', () => {
        const expectedPageHeading = "How can people use this service?";
        const expectedNextPageHeading = 'Do you want to add any locations for this service?';
        const checkBoxList = ['In person', 'Online', 'Telephone'];
        let actualList = [];

        //select In person, Online, Telephone checkboxes
        cy.selectCheckBoxes('In person');
        cy.selectCheckBoxes('Online');
        cy.selectCheckBoxes('Telephone');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })
    
    it('display error messages when no checkbox is selected', ()=> {
        const emptyTextErrorMessage = ['Select how people can use this service'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
		cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
	})

})
