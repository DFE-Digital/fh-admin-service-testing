describe("| addPerm-la-checkAnswerPage | FHG-3391 DFE - add permissions - check account details page", {tags: ['dfeAdmin']},()=>{
        const num = Date.now();
        const n = num.toString();
    // As a DFE Admin  creating an LA account
   
  it('AC 1,4 - validate page content , back link ',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.com',
			'Name': 'Unusual Koala',
			};
      cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.com')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      
    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
    cy.fullName('Unusual Koala')
    //next page 
    cy.checkAnswerPage()
    cy.contains('Permissions added')
    cy.contains('Unusual Koala')
   
  })

  it('AC 3 - Change link - who for',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.co.in',
			'Name': 'Unusual Koala',
			};
      cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.co.in')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      
    cy.get(':nth-child(1) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserPage('la')
    cy.typeOfUserLA('1')
    cy.laWhichLA('bristol')
    
    cy.email(n +'abcdef@def.co.ind')
    cy.fullName('Unusual Koala')
   
  })
  it('AC 3 - Change link - Type of permission',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.co.pl',
			'Name': 'Unusual Koala',
			};
      cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.co.pl')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      
    cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserLA('1')
    cy.laWhichLA('redbridge')
    
    cy.email(n +'abcdef@def.co.pli')
    cy.fullName('Unusual Koala')
  })
  it('AC 3 - Change link - Local authority',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.co.nz',
			'Name': 'Unusual Koala',
			};
    cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.co.nz')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      
    cy.get(':nth-child(3) > .govuk-summary-list__actions > .govuk-link').click()
    cy.laWhichLA('redbridge')
    
    cy.email(n +'abcdef@def.co.nzl')
    cy.fullName('Unusual Koala')
  })
  it('AC 3 - Change link - Email address',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.co.au',
			'Name': 'Unusual Koala',
			};
    cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.co.au')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      
    cy.get(':nth-child(4) > .govuk-summary-list__actions > .govuk-link').click()
    cy.email(n +'abcdef@def.co.aul')
    cy.fullName('Unusual Koala')
  })
  it('AC 3 - Change link - Name',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a local authority',
			'Type of permission': 'Add and manage services, family hubs and accounts',
			'Local authority': 'Bristol County Council',
			'Email address': n + 'abcdef@def.co.au',
			'Name': 'Unusual Koala',
			};
      cy.visit('/')
      cy.dfeAdminWelcomePage()
      cy.addPermissions()
      cy.typeOfUserPage('la')
      cy.typeOfUserLA('1')
      cy.laWhichLA('bristol')
      cy.wait(1000)
      cy.email(n +'abcdef@def.co.au')
      cy.fullName('Unusual Koala')
      cy.contains('Check account details')
      cy.checkAnswerDetails(expectedContent)
      cy.get(':nth-child(5) > .govuk-summary-list__actions > .govuk-link').click()
      cy.fullName('John Paul Smith Jr')
  })
})