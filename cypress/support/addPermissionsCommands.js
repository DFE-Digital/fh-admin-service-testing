Cypress.Commands.add('gotoAddPermissionsPage',()=>{
    cy.get('#add-permission').click()
})

// Type of user page 
Cypress.Commands.add('typeOfUserPage',(permissionType)=>{
    cy.title().should('eq','Who are you adding permissions for? - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Who are you adding permissions for?')
    cy.contains('Someone who works for a local authority')
    cy.contains('Someone who works for a voluntary and community sector organisation')

    // select persmission type
    if (permissionType === 'la') {
        cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
    } else if (permissionType === 'vcs'){
        cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
    }
    cy.get('#buttonContinue').click()
})

// what do they need to do - LA
Cypress.Commands.add('typeOfUserLA',(selection)=>{
    cy.title().should('eq','What do they need to do? - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('What do they need to do?')
    cy.contains('Add and manage services, family hubs and accounts')
    cy.contains('Make connection requests to voluntary and community sector services')

    // user selects checkboxes 1 , 2 or both
    if (selection === '1') {
        cy.get('[data-testid="LaManager"]').check();
    } else if (selection === '2'){
        cy.get('#LaProfessional').check();
    }
    else if (selection == 'both') {
        cy.get('[data-testid="LaManager"]').check();
        cy.get('#LaProfessional').check();
    }
    cy.get('#buttonContinue').click()
})

// what do they need to do - VCS
Cypress.Commands.add('typeOfUserVCS',(selection)=>{
    cy.title().should('eq','What do they need to do? - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('What do they need to do?')
    cy.contains('An organisation should only have one person with permissions to view and manage connection requests.')
    cy.contains('Add and manage services')
    cy.contains('View and respond to connection requests')

    // user selects checkboxes 1 , 2 or both
    if (selection === '1') {
        cy.get('[data-testid="VcsManager"]').check();
    } else if (selection === '2'){
        cy.get('#VcsProfessional').check();
    }
    else if (selection == 'both') {
        cy.get('[data-testid="VcsManager"]').check();
        cy.get('#VcsProfessional').check();
    }
    cy.get('#buttonContinue').click()
})

// What's the user's full name?
Cypress.Commands.add('fullName',(fullName)=>{
    cy.title().should('eq',"What's their full name? - Manage family support services and accounts - GOV.UK")
    cy.pageHeadings().contains("What's their full name?")
    cy.get('#fullName').click().clear().type(fullName)
    cy.get('#buttonContinue').click()
})

// Check account details page
Cypress.Commands.add('checkAnswerPage',()=>{
    cy.contains('Check account details')
    cy.get('.govuk-button').contains('Confirm details').click();
})

 // Check confirmation page 
 Cypress.Commands.add('confirmationPage',(name)=>{
    cy.get('.govuk-panel.govuk-panel--confirmation').contains('Permissions added')
    cy.contains('What happens next')
    cy.contains(`We've emailed ${name}:`)
    cy.contains('to let them know their permissions have been set up')
    cy.contains('a link to the service, where they can create their password and set up two-factor authentication')
    //
    cy.contains('Go to homepage').click()
    cy.contains('Add a user account to manage support services or connection requests.')

 })