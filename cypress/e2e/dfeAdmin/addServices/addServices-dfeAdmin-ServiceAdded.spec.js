describe("DfE Admin - Add Services - Service Added Page", () => {
    beforeEach(() => {
        const serviceName = "Test Service";
        const laServiceIsInName = "Salford City Council";
        const mainSupportCategory = "Activities, clubs and groups";
        const supportItOffers = "Holiday clubs and schemes";
        const serviceDescription = "Description of the Service";
        const extraAvailabilityDescription = "Extra Availability Description";
        const moreOnlineTelephoneDetails = "More online & telephone details";
        const contactEmail = "test@email.com";
        const contactTelephone = "+44 128 256 0512";
        const contactWebsite = "www.service.com";
        const contactText = "+44 192 384 0768";
        const evenMoreDetailsDescription = "Even more details about the Service";
        const checkboxList = [mainSupportCategory, supportItOffers];

        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        // Click the button to add a service, specifically for the LA service
        cy.get('a[href="/manage-services/start-add-service?servicetype=La"]').click();
        // Search and select a local authority, then continue
        cy.get('#select').type(laServiceIsInName);
        cy.get('#select__option--0').click();
        cy.get('div.govuk-grid-row button').click();
        //enter a service name
        cy.enterTextAndContinue('.govuk-input', serviceName, 'div.govuk-grid-row button');
        //Select a category
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Enter text in the reason text area
        cy.get('#textarea').type(serviceDescription);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        //select Yes radio button & select from and to age range
        cy.selectRadioButtonAndContinue('#ViewModel_Children_Yes', 'div.govuk-grid-row button');
        cy.get('#ViewModel_FromAge').select('0 to 12 months');
        cy.get('#ViewModel_ToAge').select('1 year old');
        // Click continue button
        cy.get('div.govuk-grid-row button').click();

        //Select a language and include language support on request
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        cy.get('#TranslationServices').check();
        cy.get('#BritishSignLanguage').check();
        //click continue button
        cy.get('form > :nth-child(5)').click();

        //select Yes radio button & type £2 into the cost text box
        cy.get('#UserInput_HasCost_Yes').click();
        cy.get('#text-area').type('£2')
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        //select In person, Online and Telephone checkboxes
        cy.get('[type="checkbox"]').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        //select Yes radio button
        cy.get('#radio-True').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select a location, store it and move on
        cy.get('#select').type('London');
        cy.get('#select__option--0').click(); // Autofill the location selection
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select all checkboxes for 'on which days can people use this service'
        cy.get('[type="checkbox"]').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select yes & type some details
        cy.get('#UserInput_HasDetails_Yes').click();
        cy.get('#text-area').type(extraAvailabilityDescription);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        //click on continue button
        cy.contains('Continue').click();

        // Select all checkboxes for 'on which days can people use this service online or by telephone'
        cy.get('[type="checkbox"]').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select yes & type some details
        cy.get('#UserInput_HasDetails_Yes').click();
        cy.get('#text-area').type(moreOnlineTelephoneDetails);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select all checkboxes for contact options
        cy.get('[type="checkbox"]').check();
        cy.get('#email-text-box').type(contactEmail);
        cy.get('#telephone-text-box').type(contactTelephone);
        cy.get('#website-text-box').type(contactWebsite);
        cy.get('#text-message-text-box').type(contactText);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        cy.get('#textarea').type(evenMoreDetailsDescription);
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        cy.contains('Confirm details').click();

        // Make sure we have landed at the correct page
        cy.url().should('include', 'Service-Add-Confirmation');
    })

    it('Should contain the correct content', () => {
        cy.get('#main-content > div > div > div > h1').contains("Service added");
        cy.get('#main-content > div > div > h2').contains('What happens next');
        cy.get('#main-content > div > div > p')
            .contains('People can now find this service on the directory. You can view and edit your services.');
        cy.get('#main-content > div > div > a').contains('Go to homepage');
    });

    it('Should go to the services screen when view and edit services hyperlink is pressed', () => {
        cy.get('a[href*="manage-services"]').click();
        cy.url().should('include', 'manage-services');
    });

    it('Should go back to the home page when the button is pressed', () => {
        cy.get('#main-content > div > div > a').click();
        cy.url().should('include', 'Welcome');
    });
});
