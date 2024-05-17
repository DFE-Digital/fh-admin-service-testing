import { getRandomInt } from '../../../support/helperFunctions';
import { getRandomLetter } from '../../../support/helperFunctions';

const expectedPageHeading = "Service details";
         
const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Service-Edit-Confirmation";

describe('LA Man - manage services - edit service details', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('laman')

        // And I am on the view services page
        cy.navigateToViewServicesPage()

        // When I apply a filter
        cy.get('[id="service-name"]').type('Edit');
        cy.get('[type="submit"]').contains('Apply filter').click();

        // And I click to view a service   
        cy.get('.govuk-table__cell a')
        .eq(0)
        .click();
    })

    it('can edit service name', () => {
        // When I click the change link for name
        cy.clickChangeLink('Name');

        // And I change the name
        cy.get('[id="textbox"]').clear();
        cy.get('[id="textbox"]').type('Edit Automated Test ' + getRandomInt(0, 100).toString())

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageHeading("h1", expectedPageHeading);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrl(expectedPageUrl); 
    })

    it('can edit description', () => {
        // When I click the change link for description
        cy.clickChangeLink('Description');

        // And I change the name
        cy.get('[name="TextAreaValue"]').clear();
        cy.get('[name="TextAreaValue"]').type('Description' + getRandomInt(0, 100).toString())

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageHeading("h1", expectedPageHeading);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrl(expectedPageUrl); 
    })

    it('can edit whether support related to children or young people', () => {
        // When I click the change link for children or young people
        cy.clickChangeLink('Does support relate to children or young people?');

        // And I change option to whichever is not selected
        cy.get('[value="false"]').click();

        // And if yes is selected a cost is entered
        if (cy.get('[id="ViewModel_Children_Yes"]').invoke('attr', 'value') == true) {
            cy.selectYesRadioButtonAndAgeRange('2 years old', '5 years old');
        }

        // And I click continue
        cy.get('#main-content > div > div > fieldset > form > button').click();

        // Then view service page is displayed
        cy.checkPageHeading("h1", expectedPageHeading);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrl(expectedPageUrl); 

    })

    it('can edit cost', () => {
        // When I click the change link for cost
        cy.clickChangeLink('Cost');

        // And I change option to whichever is not selected
        cy.get('#UserInput_HasCost_Yes').invoke('attr', 'checked').then(($value) => {
            if ($value === 'checked') {
                cy.get('[id="UserInput_HasCost_No"]').click();
            }
            else {
                cy.get('[id="UserInput_HasCost_Yes"]').click();
   
                //if yes is selected a cost is entered
                cy.get('[id="text-area"]').clear();
                cy.get('[id="text-area"]').type('Edit Automated Test Cost' + getRandomInt(0, 100).toString())
            }
        });

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageHeading("h1", expectedPageHeading);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrl(expectedPageUrl); 
    })
});