describe.skip('DfE Admin - manage services - can children or young people access page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage services').click();
        cy.get('.govuk-table__cell a')
            .eq(0)
            .click();
        cy.clickChangeLinkForServiceCategory('Does support relate to children and young people?');
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Is the support offered by this service related to children or young people?";
        let actualRadioButtons = [];
        let expectedRadioButtons = ['Yes', 'No'];
        const expectedPreviousPageHeading = 'Service details';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check radio buttons
        cy.getRadioButtons('.govuk-radios__label', actualRadioButtons, expectedRadioButtons);
        //verify No radio button is selected
        cy.get('#ViewModel_Children_No').should('be.checked');
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPreviousPageHeading);
    })

    it('Select Yes radio button and continue to next page', () => {
        const expectedNextPageHeading = 'Service details';

        //Select Yes radio button, age range and continue
        cy.selectYesRadioButtonAndAgeRange('2 years old', '5 years old');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Navigate to children or young people page
        cy.clickChangeLinkForServiceCategory('Does support relate to children and young people?');
        //Select Yes radio button, age range and continue
        cy.selectYesRadioButtonAndAgeRange('2 years old', '5 years old');
        //Navigate to children or young people page
        cy.clickChangeLinkForServiceCategory('Does support relate to children and young people?');
        //verify Yes radio button is selected
        cy.get('#ViewModel_Children_Yes').should('be.checked');
        //Verify selected age range values
        cy.get('#ViewModel_FromAge').should('have.value', '2');
        cy.get('#ViewModel_ToAge').should('have.value', '5');
        //Reset to original value - No radio button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
    })

    it('display error messages for no age range selection', () => {
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
});