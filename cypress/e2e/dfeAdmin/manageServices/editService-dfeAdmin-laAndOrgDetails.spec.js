import { getRandomInt } from '../../../support/helperFunctions';
import { getRandomLetter } from '../../../support/helperFunctions';

const expectedViewServicePageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Service-Detail?";

const expectedOrganisationPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Vcs-Organisation?";         
const expectedConfirmationPageUrl = "https://test.manage-family-support-services-and-accounts.education.gov.uk/manage-services/Service-Edit-Confirmation";

describe('DfE Admin - manage services - edit service details', () => {
    beforeEach(() => {
        // Given I am logged in as DFE admin
        cy.visit('/')
        cy.integrationLogin('dfeadmin')

        // And I am on the view services page
        cy.navigateToDfeAdminViewServicesPage()
    })

    it('can edit associated LA for a LA service', () => {
        // When I apply a filter
        cy.get('[id="service-name"]').type('Edit LA Service');
        cy.get('[type="submit"]').contains('Apply filter').click();

        // And I click to view a service   
        cy.get('.govuk-table__cell a')
        .eq(0)
        .click();

        // When I click the change link for Local authority
        cy.clickChangeLink('Local authority');

        // And I change the Local authority to a different one
        cy.get('[id="select__option--0"]').invoke('text').then(($value) => {
            if ($value === 'Tower Hamlets Council') {
                cy.get('[id="select"]').clear();
                cy.get('[id="select"]').type('Bristol County');
            }
            else {
                cy.get('[id="select"]').clear();
                cy.get('[id="select"]').type('Tower Hamlets');
            }
        });
    
        cy.get('[id="select__option--0"]').click();

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageUrlContains(expectedViewServicePageUrl);

        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrlContains(expectedConfirmationPageUrl); 
    })

    it('can edit associated LA for a VCS service', () => {
        // When I apply a filter
        cy.get('[id="service-name"]').type('Edit VCS Service');
        cy.get('[type="submit"]').contains('Apply filter').click();

        // And I click to view a service   
        cy.get('.govuk-table__cell a')
        .eq(0)
        .click();

        // When I click the change link for Local authority
        cy.clickChangeLink('Local authority');

        
        // And I change the Local authority to a different one
        cy.get('[id="select__option--0"]').invoke('text').then(($value) => {

            let organisation = "";
            if ($value === 'Tower Hamlets Council') {
                organisation = "The Vench";

                cy.get('[id="select"]').clear();
                cy.get('[id="select"]').type('Bristol County')
            }
            else {
                organisation = "Elop Mentoring";

                cy.get('[id="select"]').clear();
                cy.get('[id="select"]').type('Tower Hamlets')
            }

            cy.wrap(organisation).as('organisation');
        });
        
        cy.get('[id="select__option--0"]').click();

        //I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then which organisation page is displayed
        cy.checkPageUrlContains(expectedOrganisationPageUrl); 

        // When I change the organisation
        cy.get('[id="select"]').clear();

        cy.get('@organisation').then((organisation) => {
            cy.get('[id="select"]').type(organisation);
        });

        cy.get('[id=select__option--0]').click();

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageUrlContains(expectedViewServicePageUrl);
        
        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrlContains(expectedConfirmationPageUrl); 
    })

    it('can edit associated Organisation for a VCS service', () => {
        // When I apply a filter
        cy.get('[id="service-name"]').type('Edit VCS Service');
        cy.get('[type="submit"]').contains('Apply filter').click();

        // And I click to view a service   
        cy.get('.govuk-table__cell a')
        .eq(0)
        .click();

        // When I click the change link for Organisation
        cy.clickChangeLink('Organisation');

        // Then which organisation page is displayed
        cy.checkPageUrlContains(expectedOrganisationPageUrl); 

        // When I change the organisation - chooses an organisation based on previous selection
        cy.get('[id="select__option--0"]').invoke('text').then(($value) => {
            switch($value.trim()) {
                case "The Vench":
                    cy.get('[id="select"]').clear();
                    cy.get('[id="select"]').type('Bluebell Care')
                break;
                case "Bluebell Care":
                    cy.get('[id="select"]').clear();
                    cy.get('[id="select"]').type("The Vench")
                break;
                case "Elop Mentoring":
                    cy.get('[id="select"]').clear();
                    cy.get('[id="select"]').type("National Teaching And Advisory Service")
                break;
                case "National Teaching And Advisory Service":
                    cy.get('[id="select"]').clear();
                    cy.get('[id="select"]').type("Elop Mentoring")
                break;
                default:
                    cy.log('preset value is not as expected' + $value)
              }
        });

        // And I click continue
        cy.get('#main-content > div > div > form > button').click();

        // Then view service page is displayed
        cy.checkPageUrlContains(expectedViewServicePageUrl);
        
        // And I click save
        cy.get('#main-content > div > div > form > button').click();

        // Then the changes saved page is displayed
        cy.checkPageUrlContains(expectedConfirmationPageUrl); 
    })
});