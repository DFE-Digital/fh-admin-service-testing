// referral Service - landing page
Cypress.Commands.add('refServLanding', () => {
    cy.contains('Connect families to support')
    cy.get('.govuk-button.govuk-button--start').click();
})

// search by post code 
Cypress.Commands.add('searchbypostcode', (postcode) => {

    cy.get('input#Postcode').click().type(postcode);
    cy.get('[data-testid="button-search"]').click();
    // cy.contains('Services, groups and activities in this area')
})

Cypress.Commands.add('selectRadioButtonAndContinue', (radioLocator, continueLocator) => {
    //click on Yes radio button
    cy.get(radioLocator).click();
    //click continue button on consent page
    cy.get(continueLocator).click();
})

Cypress.Commands.add('enterTextAndContinue', (textBoxLocator, enteredtext, continueLocator) => {
    //enter a contact name
    cy.get(textBoxLocator).clear().type(enteredtext);
    //click continue button on contact name page
    cy.get(continueLocator).click();
})

Cypress.Commands.add('reasonForConnectionRequestPage', () => {
    //Enter text in the reason text area
    cy.get('#reason').type('Test connection request');
    //click continue button on reason for connection page
    cy.get('div.govuk-grid-row button').click();
})

Cypress.Commands.add('selectCheckBoxes', (label) => {
    cy.contains('label', label)
        .parent()
        .find('input')
        .check();
})

Cypress.Commands.add('checkTextOf', (locator, expectedText)=> {
    cy.get(locator).should('be.visible').invoke('text').then((text)=> {
        expect(text.trim()).to.equal(expectedText);
    })
})

