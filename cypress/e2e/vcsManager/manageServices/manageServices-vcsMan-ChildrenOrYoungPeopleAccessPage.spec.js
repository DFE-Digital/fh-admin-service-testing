describe('VCS Manager - manage services - can children or young people access page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Services').click();
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
        //verify Yes radio button is selected
        cy.get('#ViewModel_Children_Yes').should('be.checked');
        //Verify selected age range values
        cy.get('#ViewModel_FromAge').should('have.value', '12');
        cy.get('#ViewModel_ToAge').should('have.value', '21');
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPreviousPageHeading);
    })

    it('Select No radio button and continue to next page', () => {
        const expectedNextPageHeading = 'Service details';

        //Select No radio button and continue
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Navigate to children or young people page
        cy.clickChangeLinkForServiceCategory('Does support relate to children and young people?');
        //verify Yes radio button is selected
        cy.get('#ViewModel_Children_No').should('be.checked');
        //Reset to original value - yes radio button
        cy.selectYesRadioButtonAndAgeRange('12 years old', '21 years old');
    })

});