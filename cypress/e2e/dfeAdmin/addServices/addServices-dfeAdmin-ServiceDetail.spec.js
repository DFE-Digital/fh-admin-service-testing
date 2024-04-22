describe("DfE Admin - Add Services - Service Detail Page", () => {
    const serviceName = "Test Service";
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
    const howServiceIsProvided = "In Person, Online, Telephone";

    let previousPageSlug = "";
    let selectedLocation = "";

    beforeEach(() => {
        const checkboxList = [mainSupportCategory, supportItOffers];
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        //click on continue button
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

        // Select a location
        cy.get('#select-location-location').type('London');
        cy.get('#main-content > div > div > h1').click(); // Autofill the location selection
        cy.get('#select-location-location').invoke('val').then(location => selectedLocation = location);
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
        cy.get('#main-content > div > div > form > div.govuk-button-group > button:nth-child(1)').click();

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
        cy.url().then(url => previousPageSlug = url.split("/").pop());
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Make sure we have landed at the correct page
        cy.url().should('include', 'Service-Detail');
    })

    it('Should go back to the previous page', () => {
        cy.get('body > div.govuk-width-container > a').click();
        cy.url().should('include', previousPageSlug);
    });

    it('Should contain correct heading and subheadings', () => {
        cy.get('#main-content > div > div > h1').contains('Check the details and add service');

        cy.get('#main-content > div > div > h2:nth-child(2)').contains('Service details');
        cy.get('#main-content > div > div > h2:nth-child(4)').contains('Using this service');
        cy.get('#main-content > div > div > h3:nth-child(6)').contains('Location 1');
        cy.get('#main-content > div > div > h3:nth-child(8)').contains(howServiceIsProvided);
        cy.get('#main-content > div > div > h2:nth-child(10)').contains('Further information');
    });

    it('Should contain given service details', () => {
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dt').contains('Name');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(serviceName);

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dt').contains('Support it offers');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains(supportItOffers);

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dt').contains('Description');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(serviceDescription);

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(4) > dt')
            .contains('Does support relate to children or young people?');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(4) > dd.govuk-summary-list__value')
            .contains('Yes - 0 years old to 1 years old');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(5) > dt').contains('Languages');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(5) > dd.govuk-summary-list__value')
            .contains('French');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(5) > dd.govuk-summary-list__value')
            .contains('British Sign Language and translation services available on request');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(6) > dt').contains('Cost');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(6) > dd.govuk-summary-list__value')
            .contains("Yes - £2");

        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dt')
            .contains('How this service is provided');
        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(howServiceIsProvided);

        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(2) > dt').contains('Locations');
        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('1 Location');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dt').contains('Address');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd')
            .contains(selectedLocation);

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2)').contains('Family hub');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd').invoke('text').should('match', /Yes|No/);

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(4) > dt')
            .contains('Days service is available');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(4) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(5) > dt')
            .contains('Extra availability details');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(5) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(extraAvailabilityDescription);

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dt').contains('Days service is available');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dt').contains('Extra availability details');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(moreOnlineTelephoneDetails);

        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dt').contains('Contact details');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactEmail);
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactTelephone);
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactWebsite);
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactText);

        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(2) > dt').contains('More details');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(evenMoreDetailsDescription);
    });

    it('Should allow content to be changed', () => {
        let serviceNameChanged = "Test Service Changed";

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textbox').clear().type(serviceNameChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(serviceNameChanged);

        let supportItOffersChanged = "Music, arts and dance"

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.selectCheckBoxes(mainSupportCategory);
        cy.selectCheckBoxes(supportItOffersChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains(supportItOffers);
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains(supportItOffersChanged);

        let serviceDescriptionChanged = "Description of the Service Changed"

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textarea').clear().type(serviceDescriptionChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(serviceDescriptionChanged);

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(4) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#ViewModel_FromAge').select('3 years old');
        cy.get('#ViewModel_ToAge').select('4 years old');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(4) > dd.govuk-summary-list__value')
            .contains('Yes - 3 years old to 4 years old');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(5) > dd.govuk-summary-list__actions > a')
            .click();
        cy.selectLanguage('#language-0', '#language-0__option--0', 'English');
        cy.get('#main-content > div > div > div > form > button:nth-child(5)').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(5) > dd.govuk-summary-list__value')
            .contains('English');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(6) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#text-area').clear().type('£5');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(6) > dd.govuk-summary-list__value')
            .contains('Yes - £5');

        let howServiceIsProvidedChanged = "Online, Telephone";

        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#checkbox-InPerson').uncheck();
        cy.get('div.govuk-grid-row button').click();
        cy.get('div.govuk-grid-row button').click();
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(5) > div > dd.govuk-summary-list__value')
            .contains(howServiceIsProvidedChanged);
        cy.get('#main-content > div > div > h3').contains(howServiceIsProvidedChanged);

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#checkbox-SA').uncheck();
        cy.get('#checkbox-SU').uncheck();
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday');

        let extraAvailabilityDescriptionChanged = "Changed When People can use the Service";

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#text-area').clear().type(extraAvailabilityDescriptionChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(extraAvailabilityDescriptionChanged);

        let contactEmailChanged = "email@changed.com";
        let contactTelephoneChanged = "+44 123 456 0789";
        let contactWebsiteChanged = "www.service-changed.co.uk";
        let contactTextChanged = "+44 700 900 0982";

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#email-text-box').clear().type(contactEmailChanged);
        cy.get('#telephone-text-box').clear().type(contactTelephoneChanged);
        cy.get('#website-text-box').clear().type(contactWebsiteChanged);
        cy.get('#text-message-text-box').clear().type(contactTextChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactEmailChanged);
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactTelephoneChanged);
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactWebsiteChanged);
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains(contactTextChanged);

        let evenMoreDetailsDescriptionChanged = "Changed further details about the Service";

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textarea').clear().type(evenMoreDetailsDescriptionChanged);
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains(evenMoreDetailsDescriptionChanged);
    });
})