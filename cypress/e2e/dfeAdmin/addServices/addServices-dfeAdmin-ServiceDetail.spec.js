// TODO: .contains('1 test 2603, test line 1, leeds, LS6 1LT'); <- Get this during the beforeEach hook and use as a variable.
// TODO: Add test(s) for the Back button
// TODO: Make a load of const for the text validation stuff

describe("DfE Admin - Add Services - Service Detail Page", { testIsolation: false }, () => {
    before(() => {
        const checkboxList = ['Activities, clubs and groups', 'Holiday clubs and schemes'];
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //enter a service name
        cy.enterTextAndContinue('.govuk-input', 'Test Service', 'div.govuk-grid-row button');
        //Select a category
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Enter text in the reason text area
        cy.get('#textarea').type('Description of the Service');
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
        cy.get('#select-location-location').type('1').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select all checkboxes for 'on which days can people use this service'
        cy.get('[type="checkbox"]').check();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select yes & type some details
        cy.get('#UserInput_HasDetails_Yes').click();
        cy.get('#text-area').type('Extra Availability Description');
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
        cy.get('#text-area').type('More online & telephone details');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        // Select all checkboxes for contact options
        cy.get('[type="checkbox"]').check();
        cy.get('#email-text-box').type('test@email.com');
        cy.get('#telephone-text-box').type("+44 128 256 0512");
        cy.get('#website-text-box').type('www.service.com');
        cy.get('#text-message-text-box').type('+44 192 384 0768');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        cy.get('#textarea').type('Even more details about the Service');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('Should contain the correct url', () => {
        cy.url().should('include', 'Service-Detail');
    });

    it('Should contain correct heading', () => {
        cy.get('#main-content > div > div > h1').contains('Check the details and add service');
    });

    it('Should contain correct subheadings', () => {
        cy.get('#main-content > div > div > h2:nth-child(2)').contains('Service details');
        cy.get('#main-content > div > div > h2:nth-child(4)').contains('Using this service');
        cy.get('#main-content > div > div > h3:nth-child(6)').contains('Location 1');
        cy.get('#main-content > div > div > h3:nth-child(8)').contains('In Person, Online, Telephone');
        cy.get('#main-content > div > div > h2:nth-child(10)').contains('Further information');
    });

    it('Should contain given service details', () => {
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dt').contains('Name');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Test Service');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dt').contains('Support it offers');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('Holiday clubs and schemes');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dt').contains('Description');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Description of the Service');

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
    });

    it('Should contain given details for using this service', () => {
        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dt')
            .contains('How this service is provided');
        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('In Person, Online, Telephone');

        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(2) > dt').contains('Locations');
        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('1 Location');
    });

    it('Should contain given details for location 1', () => {
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dt').contains('Address');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd')
            .contains('1 test 2603, test line 1, leeds, LS6 1LT');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2)').contains('Family hub');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd').contains('Yes');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(4) > dt')
            .contains('Days service is available');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(4) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(5) > dt')
            .contains('Extra availability details');
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(5) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Extra Availability Description');
    });

    it('Should contain given details around In Person, Online and Telephone', () => {
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dt').contains('Days service is available');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dt').contains('Extra availability details');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('More online & telephone details');
    });

    it('Should contain given details for Further Information', () => {
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dt').contains('Contact details');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('test@email.com');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('+44 128 256 0512');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('www.service.com');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('+44 192 384 0768');

        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(2) > dt').contains('More details');
        cy.get('#main-content > div > div > dl:nth-child(11) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Even more details about the Service');
    });

    it('Should allow content to be changed', () => {
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textbox').clear().type('Test Service Changed');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Test Service Changed');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.selectCheckBoxes('Activities, clubs and groups');
        cy.selectCheckBoxes('Music, arts and dance');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('Holiday clubs and schemes');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('Music, arts and dance');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textarea').clear().type('Description of the Service Changed');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Description of the Service Changed');

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

        cy.get('#main-content > div > div > dl:nth-child(5) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#checkbox-InPerson').uncheck();
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(5) > div > dd.govuk-summary-list__value')
            .contains('Online, Telephone');
        cy.get('#main-content > div > div > h3').contains('Online, Telephone');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#checkbox-SA').uncheck();
        cy.get('#checkbox-SU').uncheck();
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('Monday, Tuesday, Wednesday, Thursday, Friday');

        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#text-area').clear().type('Changed When People can use the Service');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Changed When People can use the Service');

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#email-text-box').clear().type('email@changed.com');
        cy.get('#telephone-text-box').clear().type("+44 123 456 0789");
        cy.get('#website-text-box').clear().type('www.service-changed.co.uk');
        cy.get('#text-message-text-box').clear().type('+44 700 900 0982');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('email@changed.com');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('+44 123 456 0789');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('www.service-changed.co.uk');
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('+44 700 900 0982');

        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__actions > a')
            .click();
        cy.get('#textarea').clear().type('Changed further details about the Service');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#main-content > div > div > dl:nth-child(9) > div:nth-child(2) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Changed further details about the Service');
    });
})