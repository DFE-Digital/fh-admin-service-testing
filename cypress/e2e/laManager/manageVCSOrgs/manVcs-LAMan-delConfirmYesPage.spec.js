describe('| manVcs-dfeAmin-delConfirmYesPage | FHG-3807 DFE Admin - Manage VCS organisations (You have deleted the service page)',{tags: ['dfeAdmin']},()=>{
  
    it('AC 1,2,3 - page content , go to homepage , title ',function(){
        cy.visit('/')
        cy.dfeAdminWelcomePage()
         //manage VCS link
        cy.manVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.manVcsDel()
        cy.DelVcsPage()    

         cy.DelVcsPage('Yes')    
        // add validation - You have not deleted the service confirmation page
        cy.VcsYesDelPage()
        // homepage
        cy.dfeAdminWelcomePage()
    
})


})