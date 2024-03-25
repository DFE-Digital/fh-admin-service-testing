describe('DfE Admin - Add services - How can people find out more about this service page', () => {
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
    })

    it('validate page content, checkboxes and back link', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedStaticText = 'Select all that apply.';
        let actualText = [];
        const expectedText = ['Email', 'Telephone', 'Website', 'Text message'];
        const expectedPrevPageHeading = 'Can you provide more details about when people can use this service?';

        //check page heading
        cy.checkPageHeading(".govuk-label-wrapper > .govuk-label", expectedPageHeading);
        //check static text
        cy.checkTextOf('.govuk-label-wrapper > p', expectedStaticText);
        //check box content
        cy.getvisibleTextOfElements(".govuk-checkboxes__label", actualText, expectedText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPrevPageHeading);
    })

    it('Select Email checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedNextPageHeading = 'Give more details about this service';
        const checkBoxList = ['Email'];
        let actualList = [];

        //select Email checkbox
        cy.selectCheckBoxes('Email');
        //check sub text
        cy.checkTextOf('#email-details > .govuk-label', 'Email address');
        //enter email address
        cy.enterText('#email-text-box', 'a@test.com');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select Telephone checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedNextPageHeading = 'Give more details about this service';
        const checkBoxList = ['Telephone'];
        let actualList = [];

        //select telephone checkbox
        cy.selectCheckBoxes('Telephone');
        //check sub text
        cy.checkTextOf('#telephone-details > .govuk-label', 'Telephone number');
        //enter telephone
        cy.enterText('#telephone-text-box', '01132887111');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select Website checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedNextPageHeading = 'Give more details about this service';
        const checkBoxList = ['Website'];
        let actualList = [];
        const subText = "Enter a specific webpage address where people can find out more about this service.";

        //select website checkbox
        cy.selectCheckBoxes('Website');
        //check sub text
        cy.checkTextOf('#website-details > .govuk-label', 'Website');
        cy.checkTextOf('#website-details > p', subText);
        //enter website address
        cy.enterText('#website-text-box', 'www.abc.com');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select Text message checkbox and continue to next page', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedNextPageHeading = 'Give more details about this service';
        const checkBoxList = ['Text message'];
        let actualList = [];

        //select text message checkbox
        cy.selectCheckBoxes('Text message');
        //check sub text
        cy.checkTextOf('#text-message-details > .govuk-label', 'Telephone number');
        //enter telephone
        cy.enterText('#text-message-text-box', '07711889911');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('Select all checkboxes and continue to next page', () => {
        const expectedPageHeading = "How can people find out more about this service?";
        const expectedNextPageHeading = 'Give more details about this service';
        const checkBoxList = ['Email', 'Telephone', 'Website', 'Text message'];
        let actualList = [];

        //select text message checkbox
        cy.selectCheckBoxes('Text message');
        //enter telephone
        cy.enterText('#text-message-text-box', '07711889911');
        //select email checkbox
        cy.selectCheckBoxes('Email');
        //enter email address
        cy.enterText('#email-text-box', 'abc@test.com');
        //select website checkbox
        cy.selectCheckBoxes('Website');
        //enter website address
        cy.enterText('#website-text-box', 'www.abc.com');
        //select telephone checkbox
        cy.selectCheckBoxes('Telephone');
        //enter telephone
        cy.enterText('#telephone-text-box', '01132887111');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('.govuk-label-wrapper > .govuk-label', expectedPageHeading);
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkBoxList);
    })

    it('display error messages when no checkbox is selected', () => {
        const emptyTextErrorMessage = ['Select how people can find out more about this service'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display error messages when all checkboxes are selected and no details entered', () => {
        const emptyTextErrorMessage = ['Enter an email address in the correct format, like name@example.com',
            'Enter a UK telephone number', 'Enter a valid webpage address, like www.example.com',
            'Enter a valid text number'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];
        const checkBoxList = ['Email', 'Telephone', 'Website', 'Text message'];

        //select all checkboxes
        checkBoxList.forEach(checkBox => {
            cy.selectCheckBoxes(checkBox);
        });
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

})
