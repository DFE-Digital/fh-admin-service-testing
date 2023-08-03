// FHG-3708
describe('| manPerm-managePermissionsPage.spec | FHG-3708 Manage permissions - edit user email ',()=>{
    const num = Date.now();
    const n = num.toString();
    it('AC 1 , 4 - page content , back link ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
         cy.editPermissionsLink()  
         // edit email link
         cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
          // enter a valid email id 
           cy.email(n +'abcdef@def.com')
        // back link
        // cy.get('.govuk-back-link').click()
        // cy.welcomePage()
       
    })
    it.only('AC 1,4 Page content ,valid email address,back button',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // edit service 
        cy.editPermissionsLink()  
         // edit email link
        cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
          // enter a valid email id 
        cy.email(n +'abcdef@def.com')
    
        cy.contains("What's their full name?")
        // back button - takes user to email page
        cy.get('.govuk-back-link').click()
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        cy.laWhichLA('bristol')
    })
    it('AC 2,3 - no data entered , incorrect /invalid email address entered - error message',()=>{
        // error message when user does not enter any email address
        cy.get('.govuk-button').click()
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')

        const invalidEmails = ['test@', 'test123', '@abc.com'];
		for (let i =0;i<invalidEmails.length;i++){
        // user enters invalid email address
        cy.email(`${invalidEmails[i]}`)
        cy.get('.govuk-error-summary').contains('There is a problem')
        cy.get('.govuk-error-summary').contains('Enter an email address')
        // after error message , user is able to continue with entering correct details
        cy.email(n +'abcdef@def.com')
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
        }
        // back button - takes user to LA page
        cy.get('.govuk-back-link').click()
    })

})