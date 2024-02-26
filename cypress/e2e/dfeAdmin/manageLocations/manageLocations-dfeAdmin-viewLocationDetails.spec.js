import { getDateString } from '../../../support/helperFunctions';

describe('DfE Admin - manage locations - view and edit details journeys', () => {
    var n = getDateString();
    const buildingName = 'Test name' + n;
    const enteredAddress = new Map([
        ['buildingName', buildingName],
        ['line1', 'Test address'],
        ['townOrCity', 'Bristol'],
        ['postcode', 'LS6 1QA']
    ]);
    const newAddress = new Map([
        ['buildingName', buildingName],
        ['line1', 'new address'],
        ['townOrCity', 'Bristol'],
        ['postcode', 'LS6 1QA']
    ]);

    before(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a location').click();
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
    })

    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Manage locations').click();
        //enter text in filter box and click on Apply filter button
        cy.enterTextAndContinue('#SearchName', buildingName, '#filters-component > .govuk-button');
        //click on View details link on filtered location
        cy.get('.govuk-table__body .govuk-table__row')
            .first() 
            .find('td.govuk-table__cell:nth-child(2) a') 
            .click(); 
    })

    it('validate location details page content', () => {
        const expectedPageHeading = "Location details";
        const expectedContent = {
            'Address': buildingName + ', Test address, Bristol, LS6 1QA',
            'Family hub': 'No',
            'More details': 'Test more details about the service'
        };
        const previousPageHeading = 'Locations'
        const expectedStaticText = 'Change details for this location.'

        //check page heading 
        cy.checkPageHeading('h1', expectedPageHeading);
        //check static text
        cy.checkTextOf('.govuk-grid-column-two-thirds > p', expectedStaticText);
        //check details
        cy.checkDetails(expectedContent);
        //click on back link
        cy.clickBackLink();
        //check previous page heading
        cy.checkPageHeading('h1', previousPageHeading)
    })

    it('select change link to amend address details', () => {
        const expectedPageHeading = 'What is the address?';
        const nextPageHeading = 'Location details';
        const confirmationPageHeading = 'You have saved these details';
        const expectedText = 'Any changes will show in the directory straight away. You can return to the list of locations.';
       
        const expectedContent = {
            'Address': buildingName + ', new address, Bristol, LS6 1QA',
            'Family hub': 'No',
            'More details': 'Test more details about the service'
        };

        //Click on change link
        cy.clickOnChangeLinkFor('Address');
        //check page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //Verify previously saved locations
        enteredAddress.forEach((text, id) => {
            cy.get(`#${id}`)
                .invoke('attr', 'value')
                .then(attributeValue => {
                    expect(attributeValue.trim()).to.equal(text)
                });
        });
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
        //click on save button
        cy.get('form > .govuk-button').click();
        //check confirmation page heading
        cy.checkPageHeading('h1', confirmationPageHeading);
        //check static text
        cy.checkTextOf('main#main-content p', expectedText)
        //check view and edit locations link href
        cy.get('main#main-content p a').should('have.attr', 'href', '/manage-locations')
        //Navigate to home page using Return to homepage button
        cy.get('main#main-content .govuk-button').should('have.text', 'Go to homepage').click();
        //check homepage heading
        cy.checkPageHeading('h1', 'DfE Admin');
    })

    it('select change link to amend family hub details', () => {
        const expectedPageHeading = 'Is this location a family hub?';
        const nextPageHeading = 'Location details';
        const confirmationPageHeading = 'You have saved these details';
        const expectedText = 'Any changes will show in the directory straight away. You can return to the list of locations.';

        const expectedContent = {
            'Address': buildingName + ', new address, Bristol, LS6 1QA',
            'Family hub': 'Yes',
            'More details': 'Test more details about the service'
        };

        //Click on change link
        cy.clickOnChangeLinkFor('Family hub');
        //check page heading
        cy.checkPageHeading('h1', expectedPageHeading);
        //Select Yes radio button and continue
        cy.selectRadioButtonAndContinue('#radio-True', 'div.govuk-grid-row button');
        //check the page heading
        cy.checkPageHeading('.govuk-heading-l', nextPageHeading);
        //check details
        cy.checkDetails(expectedContent);
        //click on save button
        cy.get('form > .govuk-button').click();
        //check confirmation page heading
        cy.checkPageHeading('h1', confirmationPageHeading);
        //check static text
        cy.checkTextOf('main#main-content p', expectedText)
        //check view and edit locations link href
        cy.get('main#main-content p a').should('have.attr', 'href', '/manage-locations')
        //Navigate to home page using Return to homepage button
        cy.get('main#main-content .govuk-button').should('have.text', 'Go to homepage').click();
        //check homepage heading
        cy.checkPageHeading('h1', 'DfE Admin');
    })

    it('select change link to amend more details', () => {
        const expectedPageHeading = 'Is there anything else people need to know about this location?';
        const nextPageHeading = 'Location details';
        const confirmationPageHeading = 'You have saved these details';
        const expectedText = 'Any changes will show in the directory straight away. You can return to the list of locations.';

        const expectedContent = {
            'Address': buildingName + ', new address, Bristol, LS6 1QA',
            'Family hub': 'Yes',
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
        //click on save button
        cy.get('form > .govuk-button').click();
        //check confirmation page heading
        cy.checkPageHeading('h1', confirmationPageHeading);
        //check static text
        cy.checkTextOf('main#main-content p', expectedText)
        //check view and edit locations link href
        cy.get('main#main-content p a').should('have.attr', 'href', '/manage-locations')
        //Navigate to home page using Return to homepage button
        cy.get('main#main-content .govuk-button').should('have.text', 'Go to homepage').click();
        //check homepage heading
        cy.checkPageHeading('h1', 'DfE Admin');
    })
})