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

    it('test', () => {

    })
})