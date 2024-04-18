describe("DfE Admin - Add Services - Service Detail Page", () => {
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
        cy.get('#textarea').type('Test description');
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
        cy.get('#text-area').type('More location details');
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
        cy.get('#telephone-text-box').type("+44 808 157 0192");
        cy.get('#website-text-box').type('www.service.com');
        cy.get('#text-message-text-box').type('+44 808 157 0192');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();

        cy.get('#textarea').type('Even more details about the service');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('should contain the correct url', () => {
        cy.url().should('include', 'Service-Detail');
    });

    it('should contain correct heading', () => {
        cy.get('#main-content > div > div > h1').contains('Check the details and add service');
    });

    it('should contain correct subheadings', () => {
        cy.get('#main-content > div > div > h2:nth-child(2)').contains('Service details');
        cy.get('#main-content > div > div > h2:nth-child(4)').contains('Using this service');
        cy.get('#main-content > div > div > h3:nth-child(6)').contains('Location 1');
        cy.get('#main-content > div > div > h3:nth-child(8)').contains('In Person, Online, Telephone');
        cy.get('#main-content > div > div > h2:nth-child(10)').contains('Further information');
    });

    it('should contain given service details', () => {
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dt').contains('Name');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(1) > dd.govuk-summary-list__value')
            .contains('test service');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dt').contains('Support it offers');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(2) > dd.govuk-summary-list__value')
            .contains('Holiday clubs and schemes');

        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dt').contains('Description');
        cy.get('#main-content > div > div > dl:nth-child(3) > div:nth-child(3) > dd.govuk-summary-list__value.fh-pre-wrap')
            .contains('Test description');

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
})