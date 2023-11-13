// Select manage permissions link
Cypress.Commands.add('gotoManagePermissionsPage',()=>{
   cy.get('a').contains('Manage users').click()
})

//email filter 
Cypress.Commands.add('emailFilter',(email)=>{
   cy.get(':nth-child(2) > :nth-child(1) > .govuk-form-group > .govuk-fieldset > #userName').click().clear().type(`${email}`)
   cy.get('#filters-component > .govuk-button').click()
})

// Delete permissions link
Cypress.Commands.add('deletePermissionsLink',()=>{
   cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
   cy.contains('This will remove all permissions that have been given to')
})

// delete user
Cypress.Commands.add('deleteUser',(userEmail, userName)=>{
   //  Delete created user
   cy.viewport(`macbook-16`)
   cy.visit('/') 
   cy.gotoManagePermissionsPage()
   cy.emailFilter(userEmail)
   cy.deletePermissionsLink()
   cy.contains(`Do you want to delete ${userName}'s permissions?`)
   cy.get('#remove-user').click()
   cy.get('#buttonContinue').click()
   cy.contains(`You have deleted ${userName}'s permissions`)
})

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