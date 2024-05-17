import { getRandomInt } from '../../../support/helperFunctions';
import { getRandomLetter } from '../../../support/helperFunctions';

const expectedPageHeading = "Service details";
         
const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Service-Edit-Confirmation";

describe('VCS Man - manage services - edit service details', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('vcsman')

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


    it('can edit languages', () => {
        // When I click the change link for children or young people
        cy.clickChangeLink('Languages');

        // And I change the language
        cy.get('[id="language-0"]').clear();
        cy.get('[id="language-0"]').type(getRandomLetter());
        var languageOption = "language-0__option--" + getRandomInt(0, 10).toString();
        cy.get(`[id=${languageOption}]`).click();

        // And I click continue
        cy.get('#main-content > div > div > div > form > button:nth-child(5)').click();

        // Then view service page is displayed
        cy.checkPageHeading("h1", expectedPageHeading);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrl(expectedPageUrl); 

    })

});