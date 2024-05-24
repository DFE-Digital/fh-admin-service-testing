import { getDateString } from '../../../support/helperFunctions';

describe('DfE Admin - Add services - Search and select a location page', () => {
    var n = getDateString();
    const addressline1 = 'Test address' + n;

    beforeEach(() => {
        const checkboxList = ['Activities, clubs and groups', 'Holiday clubs and schemes'];
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        // Search and select a local authority, then continue
        cy.get('#select').type("Salford City Council");
        cy.get('#select__option--0').click();
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
        //select No radio button
        cy.selectRadioButtonAndContinue('#ViewModel_Children_No', 'div.govuk-grid-row button');
        //Select a language
        cy.selectLanguage('#language-0', '#language-0__option--0', 'Fre');
        //click continue button 
        cy.get('form > :nth-child(5)').click();
        //select No radio button 
        cy.get('#UserInput_HasCost_No').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select In person checkbox
        cy.selectCheckBoxes('In person');
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //select Yes radio button
        cy.get('#radio-True').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Search and select a location to add to this service";
        const expectedStaticText = 'If the location does not appear here you can add a new location.';
        const expectedPrevPageHeading = 'Do you want to add any locations for this service?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check hint text
        cy.checkTextOf('main#main-content p', expectedStaticText);
        //check add location href
        cy.get('form > p > a').should('have.attr', 'href', '/manage-locations/start-add-location?journey=Service');
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPrevPageHeading);
    })

    it('Search a postcode, select the location and continue to next page', () => {
        const expectedNextPageHeading = "On which days can people use this service at The Salvation Army?";
        const expectedPageHeading = 'Search and select a location to add to this service';
        const expectedLocation = 'The Salvation Army, 15\nClements Road, Ilford, Essex, IG1 1BH';

        //enter postcode and continue
        cy.enterText('#select-location-location', 'IG1 1BH');
        //click on location
        cy.get('#select-location-location__option--0').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check saved location
        cy.get('#select-location-location-select').invoke('val').then(value => {
            const selectedText = Cypress.$(`#select-location-location-select option[value="${value}"]`).text();
            expect(selectedText).to.equal(expectedLocation);
        });
    })

    it('Search by partial address, select the location and continue to next page', () => {
        const expectedNextPageHeading = "On which days can people use this service at The Salvation Army?";
        const expectedPageHeading = 'Search and select a location to add to this service';
        const expectedLocation = 'The Salvation Army, 15\nClements Road, Ilford, Essex, IG1 1BH';

        //enter postcode and continue
        cy.enterText('#select-location-location', 'Clements Road');
        //click on location
        cy.get('#select-location-location__option--0').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check next page heading
        cy.checkPageHeading('h1', expectedNextPageHeading);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //check saved location
        cy.get('#select-location-location-select').invoke('val').then(value => {
            const selectedText = Cypress.$(`#select-location-location-select option[value="${value}"]`).text();
            expect(selectedText).to.equal(expectedLocation);
        });
    })

    it('add a new location on the search locations page', () => {
        const expectedPageHeading = "Search and select a location to add to this service";
        const enteredAddress = new Map([
            ['buildingName', addressline1],
            ['line1', 'Test address 1'],
            ['line2', 'Street 2'],
            ['townOrCity', 'Bristol'],
            ['county', 'Bristol county'],
            ['postcode', 'LS9 8NQ']
        ]);
        const expectedLocation = addressline1+", Test address 1, Street 2, Bristol, Bristol county, LS9 8NQ";

        //click on add a new location link
        cy.contains('add a new location').click();
        //enter a valid address and continue 
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Select No radio button and continue
        cy.selectRadioButtonAndContinue('#radio-False', 'div.govuk-grid-row button');
        //Enter text in the text area
        cy.get('#textarea').type('Test more details about the service');
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check new location added
        cy.get('#select-location-location-select').invoke('val').then(value => {
            const selectedText = Cypress.$(`#select-location-location-select option[value="${value}"]`).text();
            expect(selectedText).to.equal(expectedLocation);
        });
    })

    it('display error messages when no location is selected', () => {
        const emptyTextErrorMessage = ['Select an existing location or add a new location'];
        const errorHeading = 'There is a problem';
        let [actualBannerMessages, actualMessages] = [[], []];

        //click continue button 
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, emptyTextErrorMessage, actualBannerMessages, actualMessages);
    })

})
