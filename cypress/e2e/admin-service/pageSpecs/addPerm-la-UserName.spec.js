describe("| addPerm-la-UserName | FHG-3389 DFE - add permissions - What's their full name?", {tags: ['addPerOnly']},()=>{
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
        cy.email(n +'abcdef@def.com')
	})
  it('AC 1, 3 - validate page content , back link ',()=>{
    cy.fullName('John Smith')
    cy.contains('Check account details')
    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
    // back button - takes user to email page
    cy.get('.govuk-back-link').click()
    cy.email('abc@def.com')
    // entering more than 256 characters
    const longName = ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
    cy.fullName(`${longName}`)
    cy.contains(`${longName}`)
  })
  it('AC 2 - no name entered - error message',()=>{
    cy.get('.govuk-button').click()
    cy.get('.govuk-error-summary').contains('There is a problem')
    cy.get('.govuk-error-summary').contains('Enter a name')
    // user is able to enter valid name after error message 
    cy.fullName('John Smith')
  })
})