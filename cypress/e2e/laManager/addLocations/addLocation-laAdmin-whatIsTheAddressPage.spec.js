describe('LA Admin - Add locations - What is the address page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
        cy.contains('Locations').click();
        cy.contains('add a new location').click();
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "What is the address?";
        const expectedStaticText = ['Give an address where people use the service. This helps them find the service when they search by location.', 'If people can go to different address, give the main one. You can add others later.'];
        let actualStaticText = [];
        const expectedTextBoxLabels = ['Building name (optional)', 'Address line 1', 'Address line 2 (optional)', 'Town or city', 'County (optional)', 'Postcode'];
        let actualTextBoxLabels = [];
        const previousPageHeading = 'Tower Hamlets Council Locations';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check static text
        cy.getTextOfElements("form > p", actualStaticText, expectedStaticText);
        //check text box labels
        cy.getTextOfElements("label", actualTextBoxLabels, expectedTextBoxLabels);
        //click on back link
        cy.clickBackLink();
        //check page heading
        cy.checkPageHeading("h1", previousPageHeading);
    })

    it('enter valid address and continue to next page', () => {

        const enteredAddress = new Map([
            ['buildingName', 'Test building name 1'],
            ['line1', 'Test address 1'],
            ['line2', 'Street 2'],
            ['townOrCity', 'Bristol'],
            ['county', 'Bristol county'],
            ['postcode', 'LS9 8NQ']
        ]);
        const nextPageHeading = 'Is this location a family hub?';

        //enter a valid address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading("h1", nextPageHeading);
    })

    it('verify error message when no address is entered', () => {
        const emptyTextErrorMessage = ['Enter the first line of the address', 'Enter a town or city', 'Enter a postcode'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('verify error message on empty address line 1', () => {
        const enteredAddress = new Map([
            ['buildingName', 'Test building name 1'],
            ['line1', ' '],
            ['line2', 'Street 2'],
            ['townOrCity', 'Bristol'],
            ['county', 'Bristol county'],
            ['postcode', 'LS9 8NQ']
        ]);
        const emptyTextErrorMessage = ['Enter the first line of the address'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //enter address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('verify error message on empty Town or city', () => {
        const enteredAddress = new Map([
            ['buildingName', 'Test building name 1'],
            ['line1', 'Test street 1'],
            ['line2', 'Street 2'],
            ['townOrCity', ' '],
            ['county', 'Bristol county'],
            ['postcode', 'LS9 8NQ']
        ]);
        const emptyTextErrorMessage = ['Enter a town or city'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //enter address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('verify error message on empty postcode', () => {
        const enteredAddress = new Map([
            ['buildingName', 'Test building name 1'],
            ['line1', 'Test street 1'],
            ['line2', 'Street 2'],
            ['townOrCity', 'Bristol'],
            ['county', 'Bristol county'],
            ['postcode', ' ']
        ]);
        const emptyTextErrorMessage = ['Enter a postcode'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //enter address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

    it('verify error message on invalid postcode', () => {
        const enteredAddress = new Map([
            ['buildingName', 'Test building name 1'],
            ['line1', 'Test street 1'],
            ['line2', 'Street 2'],
            ['townOrCity', 'Bristol'],
            ['county', 'Bristol county'],
            ['postcode', 'AA1 1AA']
        ]);
        const emptyTextErrorMessage = ['Invalid postcode, please enter a valid postcode'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //enter address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error messages
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })
})