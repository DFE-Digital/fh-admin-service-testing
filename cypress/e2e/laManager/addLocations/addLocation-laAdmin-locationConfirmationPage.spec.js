import { getDateString } from '../../../support/helperFunctions';

describe('LA Admin - Add locations - location confirmation page', () => {
    var n = getDateString();
    const addressline1 = 'Test address' + n;

    it('Validate page content and links', () => {
        let randomUKPostcode;
        const expectedHeading = 'Location added';
        const expectedSubHeading = 'What happens next';
        let expectedText = 'People can add services to this location. You can view and edit your locations.';

        cy.request({ url: 'https://api.postcodes.io/random/postcodes' })
            .then((response) => {
                expect(response.status).to.equal(200)
                randomUKPostcode = response.body.result.postcode;

                const enteredAddress = new Map([
                    ['line1', addressline1],
                    ['townOrCity', 'Bristol'],
                    ['postcode', randomUKPostcode]
                ]);

                cy.visit('/')
                cy.integrationLogin('laman')
                cy.contains('Locations').click();
                cy.contains('add a new location').click();
                //enter a valid address
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
                //click confirm button
                cy.contains('Confirm and add location').click();
                //check page heading
                cy.checkPageHeading('h1', expectedHeading);
                //check page sub heading
                cy.checkPageHeading('main#main-content .govuk-heading-m', expectedSubHeading);
                //check static text
                cy.checkTextOf('main#main-content p', expectedText)
                //check view and edit locations link href
                cy.get('main#main-content p a').should('have.attr', 'href', '/manage-locations')
                //Navigate to home page using Return to homepage button
                cy.get('main#main-content .govuk-button').should('have.text', 'Return to homepage').click();
                //check homepage heading
                cy.checkPageHeading('h1', 'TH - LA manager');
            });
    })
})