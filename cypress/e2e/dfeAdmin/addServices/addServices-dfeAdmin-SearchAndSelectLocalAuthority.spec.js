describe('DfE Admin - Search and Select the Local Authority Area', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
    })

    it('should contain the relevant content', () => {
        // Does Back Button Exist?
        cy.get('body > div.govuk-width-container > a').contains("Back").should('exist');

        // Does the Header exist with the content?
        cy.get('#main-content > div > div > form > div > h1')
            .contains('Search and select the local authority area this service is in').should('exist');

        // Does the text field exist?
        cy.get('#select').should('exist');

        // Does the continue button exist?
        cy.get('#main-content > div > div > form > button').contains('Continue').should('exist');
    })

    it('should go to the manage LA services page when the back button is clicked', () => {
        cy.url().should('include', 'Local-Authority');

        cy.clickBackLink();

        cy.url().should('include', 'manage-services?serviceType=La');
    })

    it('should display an error when trying to continue without inputting into the text field', () => {
        const errorHeading = 'There is a problem';
        const errorMessages = ['Enter a local authority'];
        let [actualBannerMessages, actualMessages] = [[], []];

        cy.get('div.govuk-grid-row button').click();

        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })
})
