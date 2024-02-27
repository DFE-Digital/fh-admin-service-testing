describe('DfE Admin - manage services - service name page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage services').click();
        cy.get('.govuk-table__cell a')
            .eq(1) 
            .click(); 
        cy.contains('.govuk-summary-list__actions a', 'Change').click();
    })
    
    it('validate service name page content and back link', ()=> {
        const expectedPageHeading = "What is the service name?";
        let actualText = [];
        const expectedText = '1st Hainault Scout Group Scouting';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check text box content
        cy.checkTextBoxContent(expectedText, 'value');
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', 'Service details');
    })

    it('should display error message when no text is entered', ()=> {
        const errorHeading = 'There is a problem';
        const errorMessages = ['Enter the name of the service'];
        let [actualBannerMessages, actualMessages] = [[], []];

        //enter a service name
        cy.enterTextAndContinue('.govuk-input', ' ', 'div.govuk-grid-row button');
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })
    
})