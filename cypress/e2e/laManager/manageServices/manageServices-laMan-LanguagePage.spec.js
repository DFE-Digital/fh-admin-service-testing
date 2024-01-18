describe('LA Manager - manage services - language page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.contains('Services').click();
        cy.get('.govuk-table__cell a')
            .eq(0)
            .click();
        cy.clickChangeLinkForServiceCategory('Languages');
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Which language is the service offered in?";
        let actualList = [];
        const expectedList = ['Add another language'];
        const expectedCheckboxLabels = ['Translation services on request', 'British Sign Language on request'];
        let actualCheckboxLabels = [];
        const subHeading = 'Can you offer language support?';
        const previousPageHeading = 'Is the support offered by this service related to children or young people?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check empty language text box
        cy.checkTextOf('#language-0', 'English');
        //check Add another language buttons
        cy.getTextOfElements('.fh-add-another__add-button', actualList, expectedList);
        //check sub heading
        cy.checkPageHeading('form > .govuk-heading-m', subHeading);
        //check text box labels
        cy.getTextOfElements('.govuk-checkboxes__label', actualCheckboxLabels, expectedCheckboxLabels);
        //verify No check box is selected
        cy.get('#TranslationServices').should('not.be.checked');
        cy.get('#BritishSignLanguage').should('not.be.checked');
    })

    it('Add & remove languages, checkboxes and navigate to next page', () => {
        
        //Click on Add another language button
        cy.get('.fh-add-another__add-button').click();
        //Select a language
        cy.selectLanguage('#language-1', '#language-1__option--0', 'Arab');
        //Select Translation services and British sign language on request checkbox
        cy.get('#TranslationServices').check();
        cy.get('#BritishSignLanguage').check();
        //click continue button 
        cy.get('form > :nth-child(6)').click();
        //click on Language link
        cy.clickChangeLinkForServiceCategory('Languages');
        //Remove second language
        cy.get('button[value="remove-0"]').click();
        //uncheck Translation services and British sign language on request checkbox
        cy.get('#TranslationServices').uncheck();
        cy.get('#BritishSignLanguage').uncheck();
        //click continue button 
        cy.get('form > :nth-child(6)').click();
    })

    it('display error messages when no language is selected', () => {
        const emptyTextErrorMessage = ['Enter any languages the service is offered in'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
        cy.get('form > :nth-child(5)').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })
});