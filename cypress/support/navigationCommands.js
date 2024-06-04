// Navigate to Service List Page
Cypress.Commands.add('navigateToViewServicesPage',()=>{
    cy.visit('/manage-services')
 })

// Navigate to Service List Page
Cypress.Commands.add('navigateToDfeAdminViewServicesPage',()=>{
    cy.visit('/manage-services?servicetype=La')
 })
