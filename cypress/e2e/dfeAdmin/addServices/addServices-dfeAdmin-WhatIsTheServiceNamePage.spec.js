describe('DfE Admin - service name homepage', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        cy.get('form > .govuk-button').click();
    })

    it('validate service name page content and back link', () => {
        const expectedPageHeading = "What is the service name?";
        let actualText = [];
        const expectedText = [''];
        const expectedHomePageHeading = 'Which local authority is the service in?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check text box content
        cy.getTextOfElements('#textbox', actualText, expectedText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedHomePageHeading);
    })
    
    it('should display error message when no text is entered', ()=> {
        const errorHeading = 'There is a problem';
        const errorMessages = ['Enter the name of the service'];
        let [actualBannerMessages, actualMessages] = [[], []];
        
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })
    
    it('should allow maximum text of 255 chars length and save it', ()=> {
        const enteredServiceName = "Dfe family hubs test service name with 255 characters length 1234567890Dfe family hubs test service name with 255 characters length 1234567890 Dfe family hubs test service name with 255 characters length 1234567890 Dfe family hubs test service name 255 ch";
        const expectedPageHeading = "What is the service name?";
        let actualText = [];
        
        //enter a contact name
        cy.enterTextAndContinue('.govuk-input', enteredServiceName, 'div.govuk-grid-row button');
        //click browser back button
        cy.go(-1);
        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check stored text
        cy.checkTextBoxContent(enteredServiceName, 'value');
    })
})