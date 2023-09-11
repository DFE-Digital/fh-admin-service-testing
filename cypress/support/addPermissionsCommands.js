Cypress.Commands.add('addPermissions',()=>{
    cy.get('#add-permission').click()
})

// Check account details page
Cypress.Commands.add('checkAnswerPage',()=>{
    cy.contains('Check account details')
    cy.get('.govuk-button').contains('Confirm details').click();

})

// What's the user's full name?
Cypress.Commands.add('fullName',(fullName)=>{
    cy.title().should('eq',"What's their full name? - Manage family support services and accounts - GOV.UK")
    cy.pageHeadings().contains("What's their full name?")
    cy.get('#fullName').click().clear().type(fullName)
    cy.get('#buttonContinue').click()
})