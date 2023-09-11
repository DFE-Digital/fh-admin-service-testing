// manage VCS Organisation link
Cypress.Commands.add('manVcsLink',()=>{
    cy.contains('Manage VCS organisations').click()
    cy.contains('Manage organisations')
    cy.contains('View, change or delete existing organisations.')
    cy.title().should('eq','Manage organisations - Manage family support services and accounts - GOV.UK')
  })
  Cypress.Commands.add('laManVcsLink',()=>{
    cy.contains('Manage organisations').click()
    cy.contains('Manage organisations')
    cy.contains('View, change or delete existing organisations.')
    cy.title().should('eq','Manage organisations - Manage family support services and accounts - GOV.UK')
  })
  // View VCS Organisation link
  Cypress.Commands.add('manVcsView',()=>{
    cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('View').click()
    cy.contains('Back to manage local authorities and organisations')
  })
  // Delete VCS Organisation link
  Cypress.Commands.add('manVcsDel',()=>{
    cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
  })
  // view vcs organisation 
  Cypress.Commands.add('manVcsViewPage',(orgName,LA)=>{
    cy.get('.govuk-heading-l').contains(`${orgName}`)
    cy.get('#OrganisationName').contains(`${orgName}`)
    cy.get('#LocalAuthority').contains(`${LA}`)
    cy.get('#OrganisationType').contains('Voluntary community organisation')
    cy.title().should('eq',`${orgName} - Manage family support services and accounts - GOV.UK`)
  })
  // Edit VCS Org Name 
  Cypress.Commands.add('editVcsName',(orgName)=>{
    cy.get('#linkOrganisationName').click()
    cy.contains("What is the organisation's name?")
    cy.get('#organisationName').click().clear().type(orgName)
  })
  // add VCS Org confirmation page 
  Cypress.Commands.add('addVcsOrgConfirm',()=>{
    cy.get('.govuk-button').contains('Save').click();
    cy.contains('You have saved these details')
    cy.contains('Any changes will show in the directory straight away.')
    cy.title().should('eq',`You have saved these details - Manage family support services and accounts - GOV.UK`)
    cy.get('.govuk-button').contains('Go to homepage').click();
  })