  // manage VCS Organisation link
  Cypress.Commands.add('gotoManageVcsOrganisationsPage',(loggedInUserRole)=>{

    switch(loggedInUserRole){
      case 'DfeAdmin':
        cy.contains('Manage organisations').click()
        break;

      case 'LaManager':
        cy.contains('Manage organisations').click()
        break;
    }

    cy.contains('Manage organisations')
    cy.contains('View, change or delete existing organisations.')
    cy.title().should('eq','Manage organisations - Manage family support services and accounts - GOV.UK')
  })
  
  // Click link on welcome page to goto 'Add Vcs Organisation'
  Cypress.Commands.add('gotoAddVcsOrganisationsPage',(loggedInUserRole)=>{
    switch(loggedInUserRole){
      case 'DfeAdmin':
        cy.contains('Add an organisation').click()
        break;

      case 'LaManager':
        cy.contains('Add an organisation').click()
        break;
    }

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
  Cypress.Commands.add('deleteOrganisationLink',(organisationName)=>{
    if(organisationName == 'Any'){
      cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
    }else{
      cy.get(`a[data-testid="delete_${organisationName}"]`).click()
    }
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

  // Deleted Organisation
  Cypress.Commands.add('deleteVcsOrganisation',(organisationName, loggedInUserRole)=>{
    cy.visit('/')
    cy.gotoManageVcsOrganisationsPage(loggedInUserRole)
    cy.get('button[name="SortBy"]').contains("Organisation").click()
    cy.paginationGoToLastPage()
    cy.deleteOrganisationLink(organisationName)
    cy.DelVcsPage('Yes')
    cy.VcsOrganisationDeletedConfirmationPage(organisationName)

    switch(loggedInUserRole){
      case 'DfeAdmin':
        cy.dfeAdminWelcomePage()
        break;

      case 'LaManager':
        cy.LAManWelcomePage()
        break;
    }
  })

  // Create Vcs Organisation
  Cypress.Commands.add('createVcsOrganisation',(organisationName, loggedInUserRole)=>{
    cy.visit('/')
    
    switch(loggedInUserRole){
      case 'DfeAdmin':
        cy.gotoAddVcsOrganisationsPage(loggedInUserRole)
        cy.selectWhichLA('redbridge', 'ForAddVcsOrganisation')
        break;

      case 'LaManager':
        cy.gotoAddVcsOrganisationsPage(loggedInUserRole)
        break;
    }

    cy.get('#organisationName').click().clear().type(organisationName)
    cy.get('#buttonContinue').click()
    cy.get('#buttonConfirm').click()
  })

  // Organisation deleted confirmation page
  Cypress.Commands.add('VcsOrganisationDeletedConfirmationPage',(OrgName)=>{
    cy.contains(`You have deleted ${OrgName}`)
    cy.contains('The users it created can no longer use their accounts. Any services it added are no longer showing in the directory.')
    cy.contains('You can add organisations from your homepage.')
    // cy.title().should('eq',`You have deleted ${OrgName}` - Manage family support services and accounts - GOV.UK`)
    cy.get('.govuk-button').contains('Go to homepage').click();
  })