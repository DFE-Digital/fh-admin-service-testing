describe("| addPerm-la-checkAnswerPage | FHG-3391 DFE - add permissions - check account details page", {tags: ['addPerOnly']},()=>{
        const num = Date.now();
        const n = num.toString();
    // As a DFE Admin  creating an LA account
    beforeEach(()=> {
		    cy.visit('/')
        cy.welcomePage( )
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('bristol')
        cy.email(n +'abcdef@def.com')
        cy.fullName('John Smith')
	})
  it('AC 1,4 - validate page content , back link ',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.com',
			'Name': 'John Smith',
			};
    
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
      
    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
    cy.fullName('John Smith')
    //next page 
    cy.checkAnswerPage()
    cy.contains('Permissions added')
    cy.contains('John Smith')
   
  })

  it('AC 3 - Change link - who for',()=>{
    cy.get(':nth-child(1) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserPage('la')
    cy.typeOfUserLA('1')
    cy.laWhichLA('bristol')
    cy.email(n +'abcdef@def.com')
    cy.fullName('John Smith')
   
  })
  it('AC 3 - Change link - Type of permission',()=>{
    cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserLA('1')
    cy.laWhichLA('redbridge')
    cy.email(n +'abcdef@def.com')
    cy.fullName('John Smith')
  })
  it('AC 3 - Change link - Local authority',()=>{
    cy.get(':nth-child(3) > .govuk-summary-list__actions > .govuk-link').click()
    cy.laWhichLA('redbridge')
    cy.email(n +'abcdef@def.com')
    cy.fullName('John Smith')
  })
  it('AC 3 - Change link - Email address',()=>{
    cy.get(':nth-child(4) > .govuk-summary-list__actions > .govuk-link').click()
    cy.email(n +'abcdef@def.com')
    cy.fullName('John Smith')
  })
  it('AC 3 - Change link - Name',()=>{
    cy.get(':nth-child(5) > .govuk-summary-list__actions > .govuk-link').click()
    cy.fullName('John Paul Smith Jr')
  })
})