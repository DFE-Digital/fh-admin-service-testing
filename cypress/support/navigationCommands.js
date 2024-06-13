// Navigate to Service List Page
Cypress.Commands.add('navigateToViewServicesPage',()=>{
    cy.visit('/manage-services')
 })

// Navigate to Service List Page
Cypress.Commands.add('navigateToViewLAServicesPage',()=>{
    cy.visit('/manage-services?servicetype=La')
 })

 // Navigate to Service List Page
Cypress.Commands.add('navigateToViewVCSServicesPage',()=>{
   cy.visit('/manage-services?servicetype=Vcs')
})
 
 // Navigate to Find Reports Page
 Cypress.Commands.add('navigateToViewFindReportsPage',()=>{
    cy.visit('/performance-data/Find')
 })

// Navigate to Connect Reports Page
Cypress.Commands.add('navigateToViewConnectReportsPage',()=>{
    cy.visit('/performance-data/Connect')
 })