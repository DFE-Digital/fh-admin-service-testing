describe("| addPerm-vcs-checkAnswerPage | FHG-3418 DFE - add permissions - check account details page", {tags: ['dfeAdmin']},()=>{
        const num = Date.now();
        const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(()=> {
		    cy.visit('/')
        
       // cy.startPage()
        // cy.stubLogin('dfeAdmin')
       cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.vcsWhichLA('redbridge')
        cy.whichOrgVcs('cranbrook')
        cy.email(n +'abcdef@def.com')
        cy.fullName(n +'John Paul Smith')

	})
  it('AC 1,4 - validate page content , back link ',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services',
			'Local authority': 'London Borough of Redbridge',
      'Voluntary and community organisation': 'Cranbrook Baptist Church',
			'Email address': n + 'abcdef@def.com',
			'Name':n + 'John Paul Smith',
			};
    
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
      
    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
    cy.fullName(n + 'John Smith')
    //next page 
    cy.checkAnswerPage()
    cy.contains('Permissions added')
   
  })

  it('AC 3 - Change link - who for',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services, View and respond to connection requests',
			'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
			'Email address': n + 'abcdef@def.com',
			'Name':n + 'John Steven Smith',
			};
    cy.get(':nth-child(1) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserPage('vcs')
    cy.typeOfUserVCS('both')
    cy.vcsWhichLA('bristol')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(n +'abcdef@def.com')
    cy.fullName(n + 'John Steven Smith')

    
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
   
  })
  it('AC 3 - Change link - Type of permission',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services, View and respond to connection requests',
			'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
			'Email address': n + 'abcdef@def.com',
			'Name':  n + 'John Steven Smith',
			};
    cy.get(':nth-child(2) > .govuk-summary-list__actions > .govuk-link').click()
    cy.typeOfUserVCS('both')
    cy.vcsWhichLA('bristol')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(n +'abcdef@def.com')
    cy.fullName( n + 'John Steven Smith')
     // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
    

  })
  it('AC 3 - Change link - Local authority',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services',
			'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
			'Email address': n + 'abcdef@def.com',
			'Name':  n + 'John Steven Smith',
			};
    cy.get(':nth-child(3) > .govuk-summary-list__actions > .govuk-link').click()
    cy.vcsWhichLA('bristol')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(n +'abcdef@def.com')
    cy.fullName( n + 'John Steven Smith')
     // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

   
  })
it('AC 3 - Change link - Which VCS Organisation',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services',
			'Local authority': 'London Borough of Redbridge',
      'Voluntary and community organisation': 'Jubilee Church Ilford',
			'Email address': n + 'abcdef@def.com',
			'Name':  n + 'John Steven Smith',
			};
    cy.get(':nth-child(4) > .govuk-summary-list__actions > .govuk-link').click()
    cy.whichOrgVcs('Jubilee Church Ilford')
    cy.email(n +'abcdef@def.com')
    cy.fullName( n + 'John Steven Smith')
     // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

  })

it('AC 3 - Change link - Email address',()=>{
    const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services',
			'Local authority': 'London Borough of Redbridge',
      'Voluntary and community organisation': 'Cranbrook Baptist Church',
			'Email address': n + 'new.email@def.com',
			'Name':  n + 'John Steven Smith',
			};
    cy.get(':nth-child(5) > .govuk-summary-list__actions > .govuk-link').click()
    cy.email(n +'new.email@def.com')
    cy.fullName( n + 'John Steven Smith')
     // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

  })
it('AC 3 - Change link - Name',()=>{
  const expectedContent = {
			'Who for': 'Someone who works for a voluntary and community sector organisation',
			'Type of permission': 'Add and manage services',
			'Local authority': 'London Borough of Redbridge',
      'Voluntary and community organisation': 'Cranbrook Baptist Church',
			'Email address': n + 'abcdef@def.com',
			'Name':  n + 'John Paul Smith Jr',
			};
    
    cy.get(':nth-child(6) > .govuk-summary-list__actions > .govuk-link').click()
    cy.fullName( n + 'John Paul Smith Jr')
     // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
  })
})