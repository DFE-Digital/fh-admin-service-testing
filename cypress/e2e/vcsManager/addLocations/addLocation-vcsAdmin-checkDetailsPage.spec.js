import { getDateString } from '../../../support/helperFunctions';

describe('VCS Admin - Add locations - check details and location page', () => {
    var n = getDateString();
    const addressline1 = 'Test address' + n;

    beforeEach(() => {
        const enteredAddress = new Map([
            ['line1', addressline1],
            ['townOrCity', 'Bristol'],
            ['postcode', 'LS9 8NQ']
        ]);
        cy.visit('/')
        cy.integrationLogin('vcsman')
        cy.contains('Locations').click();
        cy.contains('add a new location').click();
        //enter a valid address
        enteredAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //Enter text in the text area
        cy.get('#textarea').type('Test more details about the service');
        //click continue button 
        cy.get('div.govuk-grid-row button').click();
    })

    it('validate page content and back link', () => {
        const expectedPageHeading = "Check the details and add location";
        const expectedContent = {
            'Address': addressline1+', Bristol, LS9 8NQ',
            'More details': 'Test more details about the service'
        };
        const previousPageHeading = 'Is there anything else people need to know about this location?'

        //check page heading 
        cy.checkPageHeading('h1', expectedPageHeading);
        //check details
        cy.checkDetails(expectedContent);
        //click on back link
        cy.clickBackLink();
        //check previous page heading
        cy.checkPageHeading('h1', previousPageHeading)
    })

    it('select change link to amend address details', () => {
        const expectedPageHeading = 'What is the address?';
        const nextPageHeading = 'Check the details and add location';
        const newAddress = new Map([
            ['line1', 'new address'],
            ['townOrCity', 'Bristol'],
            ['postcode', 'LS9 8NQ']
        ]);
        const expectedContent = {
            'Address': 'new address, Bristol, LS9 8NQ',
            'More details': 'Test more details about the service'
        };

        //Click on change link
        cy.clickOnChangeLinkFor('Address');
        //check page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //enter a new address
        newAddress.forEach((text, id) => {
            cy.enterText(`#${id}`, text);
        })
        //click continue button
        cy.get('div.govuk-grid-row button').click();
        //check the page heading
        cy.checkPageHeading('.govuk-heading-l', nextPageHeading);
        //check details
        cy.checkDetails(expectedContent);
    })

    it('select change link to amend More details', () => {
        const expectedPageHeading = 'Is there anything else people need to know about this location?';
        const nextPageHeading = 'Check the details and add location';
        const expectedContent = {
            'Address': addressline1 + ', Bristol, LS9 8NQ',
            'More details': 'Test more details about the service updated'
        };

        //Click on change link
        cy.clickOnChangeLinkFor('More details');
        //check page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //Enter new text in the text area
        cy.get('#textarea').clear().type('Test more details about the service updated');
        //click continue button
        cy.get('div.govuk-grid-row button').click();
        //check the page heading
        cy.checkPageHeading('.govuk-heading-l', nextPageHeading);
        //check details
        cy.checkDetails(expectedContent);
    })

    it('Enter text and navigate to confirmation page', () => {
        let randomUKPostcode;
        const expectedHeading = 'Location added';

        cy.request({ url: 'https://api.postcodes.io/random/postcodes' })
            .then((response) => {
                expect(response.status).to.equal(200)
                randomUKPostcode = response.body.result.postcode;

                const newAddress = new Map([
                    ['line1', addressline1],
                    ['townOrCity', 'Bristol'],
                    ['postcode', randomUKPostcode]
                ]);

                //Click on change link
                cy.clickOnChangeLinkFor('Address');
                //enter a valid address
                newAddress.forEach((text, id) => {
                    cy.enterText(`#${id}`, text);
                })
                //click continue button 
                cy.get('div.govuk-grid-row button').click();
                //click confirm button
                cy.contains('Confirm and add location').click();
                //check page heading
                cy.checkPageHeading('h1', expectedHeading);
            });
    })
})