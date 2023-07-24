describe('| addPerm-la-UserEmail | FHG-3387 DFE - add permissions - What is their email address?', {tags: ['addPerOnly']},()=>{
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		cy.visit('/')
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
        cy.welcomePage( )
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('bristol')

	})
    it('AC 1,4 Page content ,valid email address,back button',()=>{
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