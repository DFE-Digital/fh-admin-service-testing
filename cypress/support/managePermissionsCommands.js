   // delete confirmation
   Cypress.Commands.add('deleteConfirm',(selection)=>{
    cy.contains('Deleting a service')
     if (selection === 'Yes') {
    cy.get('[value="Yes, I want to delete it"]').check();
    cy.get('.govuk-button').click()
    cy.contains('You have deleted the service')
  } else if (selection === 'No'){
     cy.get('[value="No, I want to keep it"]').check();
      cy.get('.govuk-button').click()
     cy.contains('You have not deleted the service')
  }
    cy.get('.govuk-button').click()
    cy.contains('Add a service to the directory.')
   })