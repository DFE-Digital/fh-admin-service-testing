Cypress.Commands.add('navigateToViewServicesPage',()=>{
    cy.visit('/manage-services')
 })

Cypress.Commands.add('navigateToViewLAServicesPage',()=>{
    cy.visit('/manage-services?servicetype=La')
 })

Cypress.Commands.add('navigateToViewVCSServicesPage',()=>{
   cy.visit('/manage-services?servicetype=Vcs')
})
 
 Cypress.Commands.add('navigateToViewFindReportsPage',()=>{
    cy.visit('/performance-data/Find')
 })

Cypress.Commands.add('navigateToViewConnectReportsPage',()=>{
    cy.visit('/performance-data/Connect')
 })