describe('DfE Admin - Search and Select the VCS Organisation Area', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.get('a[href=\'/manage-services/start-add-service?servicetype=Vcs\']').click();
        // Search and select a local authority, then continue
        cy.get('#select').type("London Borough of Redbridge");
        cy.get('#select__option--0').click();
        cy.get('div.govuk-grid-row button').click();
    })

    it('should contain the relevant content', () => {
        // Does Back Button Exist?
        cy.get('body > div.govuk-width-container > a').contains("Back").should('exist');

        // Does the Header exist with the content?
        cy.get('#main-content > div > div > form > div > h1')
            .contains('Search and select the VCS organisation that runs this service').should('exist');

        // Does the text field exist?
        cy.get('#select').should('exist');

        // Does the continue button exist?
        cy.get('#main-content > div > div > form > button').contains('Continue').should('exist');
    })

    it('should go to the manage LA services page when the back button is clicked', () => {
        cy.get('#select').type("Ark Tuition and Exam Centre");
        cy.get('#select__option--0').click();
        cy.get('div.govuk-grid-row button').click();
        cy.title().should('eq', 'What is the service name? - Manage family support services and accounts - GOV.UK');

        cy.clickBackLink();
        cy.title().should('eq', 'Search and select the VCS organisation that runs this service - Manage family support services and accounts - GOV.UK');
        cy.clickBackLink();
        cy.title().should('eq', 'Search and select the local authority area this service is in - Manage family support services and accounts - GOV.UK');
    })

    it('should display an error when trying to continue without inputting into the text field', () => {
        const errorHeading = 'There is a problem';
        const errorMessages = ['Enter an organisation'];
        let [actualBannerMessages, actualMessages] = [[], []];

        cy.get('div.govuk-grid-row button').click();

        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })

    it('Add a service via the manage services page', () => {

        cy.get('a[aria-label=\'DfE homepage\']').click();

        cy.get('a[href=\'/manage-services?servicetype=Vcs\']').click();
        cy.get('a[href=\'/manage-services/start-add-service?serviceType=Vcs\']').click();
        cy.get('#select').type("London Borough of Redbridge");
        cy.get('#select__option--0').click();
        cy.get('div.govuk-grid-row button').click();

        cy.get('#select').type("Ark Tuition and Exam Centre");
        cy.get('#select__option--0').click();
        cy.get('div.govuk-grid-row button').click();
        cy.title().should('eq', 'What is the service name? - Manage family support services and accounts - GOV.UK');

        cy.clickBackLink();
        cy.title().should('eq', 'Search and select the VCS organisation that runs this service - Manage family support services and accounts - GOV.UK');
        cy.clickBackLink();
        cy.title().should('eq', 'Search and select the local authority area this service is in - Manage family support services and accounts - GOV.UK');
    })
})