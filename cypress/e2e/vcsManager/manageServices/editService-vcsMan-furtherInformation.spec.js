import { getRandomInt } from '../../../support/helperFunctions';

const expectedViewServicePageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services";
const expectedPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Service-Edit-Confirmation";

describe('VCS Man - manage services - edit further information', () => {
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

    it('can edit contact details - text & website', () => {
        // When I click the change link for contact details
        cy.clickChangeLink('Contact details');

        // add text if it's not selected as one form of contact must be supplied
        cy.get('[id="contact-text-message"]').invoke('attr', 'aria-expanded').then(($value) => {
            if ($value === 'false') {
                cy.get('[id="contact-text-message"]').click();

                cy.get('[id="text-message-text-box"]').clear();
                cy.get('[id="text-message-text-box"]').type('07894561' + getRandomInt(100, 999).toString());
            }
        });

        // And I select or deselect website
        cy.get('[id="contact-website"]').click();
        
        // add website if it's selected
        cy.get('#contact-website').invoke('attr', 'aria-expanded').then(($value) => {
            console.log($value);
            if ($value === 'true') {
                cy.get('[id="website-text-box"]').clear();
                cy.get('[id="website-text-box"]').type(getRandomInt(100, 999).toString()+ '.com');
            }
        });
        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then the view service page is displayed
        cy.checkPageUrlContains(expectedViewServicePageUrl);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrlContains(expectedPageUrl); 

    })

    it('can edit more details', () => {
        // When I click the change link for More details
        cy.clickChangeLink('More details');

        // And I change the name
        cy.get('[id="textarea"]').clear();
        cy.get('[id="textarea"]').type('More details' + getRandomInt(0, 100).toString())

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then the view service page is displayed
        cy.checkPageUrlContains(expectedViewServicePageUrl);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrlContains(expectedPageUrl); 

    })
});