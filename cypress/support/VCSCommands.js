// Delete VCS Organisation link
Cypress.Commands.add('DelVcsPage',(selection)=>{
    cy.contains('Deleting an organisation')
    cy.contains('When you delete an organisation, you also delete:')
    cy.contains('all the user accounts it created')
    cy.contains('any services it added to the directory')
    cy.title().should('eq','Deleting an organisation - Manage family support services and accounts - GOV.UK')
     if (selection === 'Yes') {
       cy.get('#removeOrg').check();
     } else if (selection === 'No'){
       cy.get('#remove-org-2').click();
     }
      cy.get('.govuk-button').contains('Confirm').click();

})
// Service not deleted confirmation page
Cypress.Commands.add('VcsNotDelPage',()=>{
    cy.contains('You have not deleted ')
    cy.contains('The users it created can still use their accounts.')
   // cy.title().should('eq','Deleting an organisation - Manage family support services and accounts - GOV.UK')
   cy.get('.govuk-button').contains('Go to homepage').click();

})
// Service deleted confirmation page
Cypress.Commands.add('VcsYesDelPage',(OrgName)=>{
   // cy.contains(`You have deleted ${OrgName}`)
    cy.contains('The users it created can no longer use their accounts. Any services it added are no longer showing in the directory.')
    cy.contains('You can add organisations from your homepage.')
   // cy.title().should('eq',`You have deleted ${OrgName}` - Manage family support services and accounts - GOV.UK`)
   cy.get('.govuk-button').contains('Go to homepage').click();

})

Cypress.Commands.add('CreateVcsOrganisation', (email, name) => {
  cy.addPermissions()
  cy.typeOfUserPage('vcs')
  cy.typeOfUserVCS('1')
  cy.vcsWhichLA('redbridge')
  cy.whichOrgVcs('cranbrook')
  cy.email(email)
  cy.fullName(name)
  cy.checkAnswerPage()
  cy.contains('Go to homepage').click()
})

Cypress.Commands.add('LaCreateVcsOrganisation', (email, name) => {
  cy.addPermissions()
  cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')  
  cy.typeOfUserVCS('1')
  // cy.vcsWhichLA('redbridge')
  cy.whichOrgVcs('cranbrook')
  cy.email(email)
  cy.fullName(name)
  cy.checkAnswerPage()
  cy.contains('Go to homepage').click()
})
