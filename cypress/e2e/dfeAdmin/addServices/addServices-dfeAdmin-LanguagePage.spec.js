describe('DfE Admin - Add services - language selection page', () => {
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
        //select No radio button and click on continue button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Which language is the service offered in?";
        let actualList = [];
        const expectedList = ['Add another language'];
        const labelText = 'Enter a language';
        const expectedCheckboxLabels = ['Translation services on request', 'British Sign Language on request'];
        let actualCheckboxLabels = [];
        const subHeading = 'Can you offer language support?';
        const previousPageHeading = 'Is the support offered by this service related to children or young people?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check hint label
        cy.checkTextOf('.govuk-form-group > .govuk-label', labelText);
        //check empty language text box
        cy.checkTextOf('#language-0', '');
        //check Add another language buttons
        cy.getTextOfElements('.fh-add-another__add-button', actualList, expectedList);
        //check sub heading
        cy.checkPageHeading('form > .govuk-heading-m', subHeading);
        //check text box labels
        cy.getTextOfElements('.govuk-checkboxes__label', actualCheckboxLabels, expectedCheckboxLabels);
        //verify No check box is selected
        cy.get('#TranslationServices').should('not.be.checked');
        cy.get('#BritishSignLanguage').should('not.be.checked');
        //click on back link
        cy.clickBackLink();
        //check page heading
        cy.checkPageHeading("h1", previousPageHeading);
    })

    it('Add languages, checkboxes and navigate to next page', () => {
        //Select a language
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select a language
        cy.selectLanguage('#language-1', '#language-1__option--0', 'Arab');
        //Select Translation services and British sign language on request checkbox
        cy.get('#TranslationServices').check();
        cy.get('#BritishSignLanguage').check();
        //click continue button 
        cy.get('form > :nth-child(6)').click();
        //click on back link
        cy.clickBackLink();
    })

    it('display error messages when no language is selected', ()=> {
        const emptyTextErrorMessage = ['Enter any languages the service is offered in'];
		const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
        cy.get('form > :nth-child(5)').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display error messages when incorrect language is selected', () => {
        const emptyTextErrorMessage = ['Enter an available language'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Select a language
        cy.selectLanguage('#language-0', '#language-0__listbox', 'Genie');
        //click continue button 
        cy.get('form > :nth-child(5)').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display error message when duplicate language is selected', () => {
        const emptyTextErrorMessage = ['You can only select a language once'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Select a language
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select the same language
        cy.selectLanguage('#language-1', '#language-1__option--0', 'Fre');
        //click continue button 
        cy.get('form > :nth-child(6)').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('display multiple error messages', () => {
        const emptyTextErrorMessage = ['Enter any languages the service is offered in', 'Enter an available language', 
            'You can only select a language once'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select a language
        cy.selectLanguage('#language-1', '#language-1__option--0', 'Fre');
        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select the same language
        cy.selectLanguage('#language-2', '#language-2__listbox', 'Genie');
        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select the same language
        cy.selectLanguage('#language-3', '#language-3__option--0', 'Fre');
        //click continue button 
        cy.get('form > :nth-child(8)').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })
})