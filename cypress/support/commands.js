// ***********************************************
/* eslint-disable max-len */


// before each hook with clearing cookies + uncaught exception override
before(() => {
  
  cy.clearCookies();
  Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })  

});
    
// Tests FHG-1599
Cypress.Commands.add('dfeAdminWelcomePage',()=>{
    cy.get('.govuk-grid-column-two-thirds').contains('Department for Education')
    cy.title().should('eq', 'Welcome - Manage family support services and accounts - GOV.UK')
    
    // Accounts 
    cy.contains('Accounts')
    cy.contains('Add a user')
    cy.contains('Add a user account to manage support services or connection requests.')
    cy.contains('Manage users')
    cy.contains('View, edit or delete user accounts to manage support services or connection requests.')
    
    //  Voluntary Community Organisations ( VCSs)
    cy.contains('Voluntary community organisations (VCSs)')
    cy.contains('Add a VCS organisation')
    cy.contains('Add an organisation before adding permissions for its users.')
    cy.contains('Manage VCS organisations')
    cy.contains('View, change or delete existing organisations.')
    cy.contains('Upload an excel spreadsheet.')
  })

// LA Manager - Welcome page 
Cypress.Commands.add('LAManWelcomePage',(localAuthority)=>{

    if(localAuthority != undefined){
      cy.get('.govuk-grid-column-two-thirds').contains(`${localAuthority}`)
    }
    
    cy.title().should('eq', 'Welcome - Manage family support services and accounts - GOV.UK')

    cy.contains('Add a user')
    cy.contains('Manage users')
    
    cy.contains('Activate a local authority')
      .should('not.exist');
    cy.contains('Add a VCS service')
      .should('not.exist');
    cy.contains('Manage VCS services')
      .should('not.exist');

    cy.contains('Add an organisation')
    cy.contains('Manage organisations')
  })

  // LA manager -  Type of user page 
Cypress.Commands.add('LAManTypeOfUserPage',(LA,permissionType)=>{
    cy.title().should('eq','Who are you adding permissions for? - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Who are you adding permissions for?')
    cy.contains(`Someone who works for ${LA}`)
    cy.contains(`Someone who works for a voluntary and community sector organisation ${LA}`)
    // select persmission type
      if (permissionType === 'la') {
      cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
    } else if (permissionType === 'vcs'){
      cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
    }
    cy.get('#buttonContinue').click()
  })

  // What's their email address?
  Cypress.Commands.add('email',(emailAdd)=>{
    cy.title().should('eq',"What's their email address? - Manage family support services and accounts - GOV.UK")
    cy.pageHeadings().contains("What's their email address?")
    cy.contains('They will use this to sign in to their account.')
    cy.get('#emailAddress').click().clear().type(emailAdd)
    cy.get('#buttonContinue').click()
  })


  //Check details page 
Cypress.Commands.add('checkAnswerDetails', (expectedContent)=> {
// Iterate over the elements with class "govuk-summary-list__row"
    cy.get('div.govuk-summary-list__row').each(($row) => {
        // Extract the key and value from each row
        const key = $row.find('dt.govuk-summary-list__key').text().trim();
        const value = $row.find('dd.govuk-summary-list__value').text().trim();
        expect(value).to.equal(expectedContent[key]);

        cy.get($row).find('a:not(.govuk-visually-hidden)')
            .should('contain', 'Change');
    })
})

 // which organisation do they work for ?
 Cypress.Commands.add('whichOrgVcs',(searchString)=>{
    cy.contains('Which organisation do they work for?')
    cy.contains("Their organisation must be in the directory for it to appear here. If it's not, you can add an organisation.")
    cy.title().should('eq','Which organisation do they work for? - Manage family support services and accounts - GOV.UK')
    cy.get('#VcsOrganisationName').click().clear().type(searchString)
    cy.get('#VcsOrganisationName__option--0').click()
    cy.get('#buttonContinue').click()
 })
 // Add organisation link 
 Cypress.Commands.add('addOrgLink',()=>{
  cy.get('#add-organisation').click()
  cy.contains("What is the organisation's name?")
 })

// Add organisaion - What is the organisations name?
 Cypress.Commands.add('addOrgVcs',(orgName)=>{
  cy.contains("What is the organisation's name?")
  // cy.title().should('eq','Add organisation - Manage family support services and accounts - GOV.UK')
  cy.get('#organisationName').click().clear().type(orgName)
  cy.get('#buttonContinue').click()
  cy.contains('Check details')
})

// Add organisation VCS - check details page 
Cypress.Commands.add('checkDetailsPage',()=>{
  cy.contains('Check details')
  cy.title().should('eq','Check details - Manage family support services and accounts - GOV.UK')
  cy.get('#buttonConfirm').click()
})

// Add organisation VCS - confirmation page 
Cypress.Commands.add('addVcsOrgConfirmation',(userRole)=>{
  cy.contains('Voluntary community organisation added')
  cy.title().should('eq','Voluntary community organisation added - Manage family support services and accounts - GOV.UK')
  cy.contains('What happens next')

  switch(userRole){
    case 'DfeAdmin':
      cy.contains('You can now create user accounts for the organisation.')
      break;

    case 'LaManager':
      cy.contains('Before this organisation can accept support requests for its services, you need to add a user.')
      break;
  }

  cy.contains('You can do this from your homepage.')
  cy.get('#buttonGoToHome').click()
  cy.contains('Add a user account to manage support services or connection requests.')

})

// my account 
Cypress.Commands.add('myaccountPage',()=>{
  cy.contains('Manage your account')
  cy.contains('Manage your GOV.UK One Login details')
  cy.contains('To delete your account, contact your administrator.')
  cy.title().should('eq','Manage your account - Manage family support services and accounts - GOV.UK')

})
// Sign out 
Cypress.Commands.add('signOut',()=>{
   Cypress. session. clearAllSavedSessions()
    cy.get(':nth-child(2) > .govuk-header__link').contains('Sign out').click()
    cy.contains('You have signed out')
})

Cypress.Commands.add('connectlogin', (olusername, olpassword, id) => {
    cy.session([olusername, olpassword], () => {

        cy.visit(`https://${Cypress.env('username')}:${Cypress.env('password')}@signin.integration.account.gov.uk/?prompt=login`, { failOnStatusCode: false })
        //Click on Request a connection button
        cy.visit(`https://test.connect-families-to-support.education.gov.uk/ProfessionalReferral/LocalOfferDetail?serviceid=${id}`)
        cy.get('a:contains("Request a connection")').click();
        //stub-login
        cy.get('#sign-in-button').click()
        // login based on type of user 
        // login email
        cy.get('#email').type(`${Cypress.env(olusername)}`)
        cy.get('form > .govuk-button').click()
        // login password
        cy.get('#password').type(`${Cypress.env(olpassword)}`)
        cy.get('form > .govuk-button').click()
    })
})

Cypress.Commands.add('integrationLogin', (userType) => {  
  cy.session(userType,()=>{
      signIn(userType);
    },
    {
      validate() {
        cy.visit('/Welcome')
        cy.contains('My account')
        cy.visit('https://signin.integration.account.gov.uk', 
        { 
          auth: {
            username: `${Cypress.env('username')}`,
            password: `${Cypress.env('password')}`,
          },
          failOnStatusCode: true 
        })
      },
      cacheAcrossSpecs: true
    }
  )
  cy.visit('/')
})
function signIn(userType){
  cy.visit('https://signin.integration.account.gov.uk', 
  { 
    auth: {
      username: `${Cypress.env('username')}`,
      password: `${Cypress.env('password')}`,
    },
    failOnStatusCode: false 
  })
  cy.visit('https://test.manage-family-support-services-and-accounts.education.gov.uk/')

  cy.get('.js-cookie-banner-accept')
    .then((val) => {
      val.click()
  })

  cy.get('.govuk-button').contains('Start now').click();

  //
  cy.get('#sign-in-button').click()
  // login based on type of user
    if (userType == 'dfeadmin') {
        // login email
        cy.get('#email').type(`${Cypress.env('oneloginusername')}`)
        cy.get('form > .govuk-button').click()
        // login password
        cy.get('#password').type(`${Cypress.env('oneloginpassword')}`)
    }
    else if (userType == 'laman') {
        // login email
        cy.get('#email').type(`${Cypress.env('lamanoneloginusername')}`)
        cy.get('form > .govuk-button').click()
        // login password
        cy.get('#password').type(`${Cypress.env('lamanoneloginpassword')}`)
    }
    else if (userType == 'vcsman') {
        // login email
        cy.get('#email').type(`${Cypress.env('vcsmanoneloginusername')}`)
        cy.get('form > .govuk-button').click()
        // login password
        cy.get('#password').type(`${Cypress.env('vcsmanoneloginpassword')}`)
    }
  cy.get('form > .govuk-button').click()
  // check if the user is signed in
  cy.get('.govuk-link--inverse').contains('Sign out')
}

// Sort ascending / descending 
Cypress.Commands.add('checkSortOrder', (value, sortOrder)=> {
    cy.get('th.govuk-table__header').eq(value).invoke('attr', 'aria-sort').then((ariasort) => {
    expect(ariasort).to.equal(sortOrder);
	});
})

// pagination
Cypress.Commands.add('checkPaginationSelection', (value)=> {
    cy.contains('li.govuk-pagination__item a', value).should('have.attr', 'aria-current', '"page"');
})

// Page headings 
Cypress.Commands.add('pageHeadings',()=>{
  cy.get('.govuk-fieldset__heading')
})

// check page heading
Cypress.Commands.add('checkPageHeading', (locator, expectedHeading) => {
    cy.get(locator).invoke('text').then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(expectedHeading);
    })
})

// check static text using locator
Cypress.Commands.add('getTextOfElements', (locator, actualList, expectedList) => {
    cy.get(locator).each(($element) => {
        const text = $element.text().trim();
        actualList.push(text);
    }).then(() => {
        expect(actualList).to.deep.equal(expectedList);
    })
})

//check current page on pagination
Cypress.Commands.add('checkPaginationSelection', (value) => {
    cy.contains('li.govuk-pagination__item a', value).should('have.attr', 'aria-current', '"page"');
})

//click on back link
Cypress.Commands.add('clickBackLink', () => {
    cy.get('.govuk-back-link').click();
})

// check details
Cypress.Commands.add('checkDetails',(serviceName,supportType)=>{
  cy.contains('Check the service details')
  cy.get('.govuk-summary-list').contains(`${serviceName}`)
  cy.get('.govuk-summary-list').contains(`${supportType}`)
  cy.contains('Confirm details').click()
})

//Manage permissions
Cypress.Commands.add('managePermissionsPage',()=>{
  cy.contains('Manage user permissions')
  cy.contains('Edit or delete user permissions.')
  cy.contains('Filter users')
})

// Edit  permissions 
Cypress.Commands.add('editPermissionsLink',()=>{
  cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Edit').click()
  cy.contains('Back to manage user accounts')
})

// Delete permissions options page
Cypress.Commands.add('deletePermissionsOptionPage',(user,selection)=>{
  cy.contains(`Do you want to delete ${user}'s permissions?`)
  cy.contains(`This will remove all permissions that have been given to ${user}.`)
    if (selection === 'Yes') {
      cy.get('#remove-user').check();
    } else if (selection === 'No'){
      cy.get('#remove-user-2').check();
    }
    cy.get('#buttonContinue').click()
})

Cypress.Commands.add('deletePermissionsConfirmPage',(user)=>{
  cy.contains(`You have deleted ${user}'s permissions`)
})

// Filters check box - Type of user
Cypress.Commands.add('typeOfUserFilter',(selection)=>{

  // user selects checkboxes 1 , 2 or both
  if (selection === 'la') {
    cy.get('#isLaUser').check();
  } else if (selection === 'vcs'){
    cy.get('#isVcsUser').check();
  }
  else if (selection == 'both') {
    cy.get('#isLaUser').check();
    cy.get('#isVcsUser').check();
  }
  cy.get('#filters-component > .govuk-button').click()
})

// Clear filters 
Cypress.Commands.add('clearFilters',()=>{
  cy.get('a').contains('Clear filters').click();
})

//name filter 
Cypress.Commands.add('nameFilter',(name)=>{
  cy.get(':nth-child(1) > :nth-child(1) > .govuk-form-group > .govuk-fieldset > #userName').click().clear().type(`${name}`)
  cy.get('#filters-component > .govuk-button').click()
})

//organisation filter 
Cypress.Commands.add('organisationFilter',(org)=>{
  cy.get(':nth-child(3) > :nth-child(1) > .govuk-form-group > .govuk-fieldset > #userName').click().clear().type(`${org}`)
  cy.get('#filters-component > .govuk-button').click()
})

//view services
Cypress.Commands.add('ViewServices',(serviceName)=>{
  cy.contains('Manage your services').click()
  cy.get('.govuk-grid-column-full').contains(`${serviceName}`)
});

//manage services
Cypress.Commands.add('deleteServices',(serviceID)=>{
  cy.contains('Manage your services')
  cy.get('.govuk-table__row').contains(`${serviceName}`).contains('Delete').click()
});

// delete service
Cypress.Commands.add('deleteService',(serviceID)=>{
  cy.contains('Manage your services')
  cy.get(`[data-testid="${serviceID}-delete"]`).click();
})

// edit service
Cypress.Commands.add('editService',(serviceID)=>{
  cy.contains('Manage your services')
  cy.get(`[data-testid="${serviceID}-view"]`).click();
  // cy.get('.govuk-fieldset__heading').contains(`${serviceID}`)
})

// save and proceed
Cypress.Commands.add('saveDetails',()=>{
  cy.get('[data-testid="button-save"]').click()
  cy.contains('You have saved these details')
  cy.contains('Any changes will show in the directory straight away.')
  cy.get('[data-testid="homepage-button"]').click()
  cy.contains('Add a service to the directory.')
})

Cypress.Commands.add('enterTextAndContinue', (textBoxLocator, enteredtext, continueLocator)=> {
    //enter a contact name
	cy.get(textBoxLocator).clear().type(enteredtext);
	//click continue button on contact name page
	cy.get(continueLocator).click();
})

Cypress.Commands.add('enterText', (textBoxLocator, enteredtext)=> {
    //enter a contact name
	cy.get(textBoxLocator).clear().type(enteredtext);
})

Cypress.Commands.add('selectRadioButtonAndContinue', (radioLocator, continueLocator)=> {
    //click on Yes radio button
	cy.get(radioLocator).click();
	//click continue button on consent page
	cy.get(continueLocator).click();
})
// accessibility page
Cypress.Commands.add('accessibilityPage',()=>{
  cy.contains('Accessibility statement')
  cy.contains('How accessible this website is')
  cy.contains('Feedback and contact information')
  cy.contains('Reporting accessibility problems with this website')
  cy.contains('Enforcement procedure')
  cy.contains("Technical information about this website's accessibility")
  cy.contains('Compliance status')
    cy.contains("What we're doing to improve accessibility")
  cy.contains('Preparation of this accessibility statement')
  // back link
  cy.get('.govuk-back-link').click()
  cy.contains('Manage your account');


})


//---------------------- confirmation page --------------------------------------
Cypress.Commands.add('checkPanelText', (expectedHeading)=> {
    //check heading
    cy.get('.govuk-panel--confirmation h1').invoke('text').then((text)=> {
        expect(text.trim()).to.equal(expectedHeading);
    })
    cy.get('.govuk-panel--confirmation > .govuk-panel__body').invoke('text')
    .then((text)=> {
        expect(text.trim()).to.include('Request number')
    })
})


Cypress.Commands.add('selectCheckBoxes', (label)=> {
    cy.contains('label', label)
    .parent()
    .find('input')
    .check();
})

// custom command to overwrite baseUrl if we are using localhost etc
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const space = Cypress.env('SPACE');
  const basicAuthEnabled = Cypress.env(`${space}_BASIC_AUTH`) === true ||
    Cypress.env(`${space}_BASIC_AUTH`) === 'true';

  options = options || {};

  if (basicAuthEnabled) {
    options.auth = {
      username: Cypress.env(`${space}_BASIC_USERNAME`),
      password: Cypress.env(`${space}_BASIC_PASSWORD`),
    };
  }

  return originalFn(url, options);
});

// Upload excel sheet 
Cypress.Commands.add('uploadSheet',() => {
  cy.get('[data-testid="upload-spreadsheet"]').click()
  cy.contains('This file upload only supports .xlsm, .xlsx and .xls spreadsheets.')
  cy.get('#FileUpload_FormFile').selectFile('cypress/fixtures/Local Authority Data Capture v7.0 test samples-01.xlsm')

  cy.get('.govuk-button').contains('Upload').click()
  cy.contains('You have successfully uploaded your data')
})

Cypress.Commands.add('paginationGoToLastPage',() => {
  cy.get('.govuk-pagination__item').last().click()
})


//la route - which local authority do they work for ?
Cypress.Commands.add('selectWhichLA',(searchString, validateFor)=>{

  switch(validateFor){
    case 'ForUserTypeLa':
      cy.title().should('eq','Which local authority do they work for? - Manage family support services and accounts - GOV.UK')
      cy.pageHeadings().contains('Which local authority do they work for?')
      break;

    case 'ForUserTypeVcs':
      cy.title().should('eq','Which local authority area do they work in? - Manage family support services and accounts - GOV.UK')
      cy.pageHeadings().contains('Which local authority area do they work in?')
      break;

    case 'ForAddVcsOrganisation':
      cy.title().should('eq','Which Local Authority - Manage family support services and accounts - GOV.UK')
      cy.pageHeadings().contains('Which local authority is the organisation in?')
      break;

    case undefined:
      // dont validate
      break;
  }

  cy.get('#LaOrganisationName').click()
  cy.get('#LaOrganisationName').type(searchString)
  cy.get('#LaOrganisationName__option--0').click()
  cy.get('#buttonContinue').click()
})

 // cookies text
  Cypress.Commands.add('cookies',()=>{
      cy.contains(' Cookies on Manage family support services and accounts')
      cy.contains('We use some essential cookies to make this service work.')
      cy.contains('We’d also like to use analytics cookies so we can understand how you use the service and make improvements.')
      cy.contains('Accept analytics cookies');
      cy.contains('Reject analytics cookies');
      cy.contains('View cookies');
  })
  Cypress.Commands.add('cookiesPageContent',()=>{
    cy.contains("Cookies are small files saved on your phone, tablet or computer when you visit a website.")

    cy.contains("We use cookies to make Manage family support and accounts work and collect information about how you use this website.")
    cy.contains('Change your cookie settings')
    cy.contains('Do you want to accept analytics cookies?')
    // // back link
    // cy.get('.govuk-back-link').click()
    // cy.contains('Manage family support services and accounts');

  })

// contact us page 
Cypress.Commands.add('contactUsPage',()=>{
  cy.contains('Contact us')
  cy.contains("You can contact us by email at manage-family-support.service@education.gov.uk. We will aim to respond within 5 working days.")
  cy.contains("You can also give us feedback using our survey.")
  // feedback link
  cy.get('.govuk-grid-column-two-thirds > :nth-child(3) > a').should('have.attr','href','https://dferesearch.fra1.qualtrics.com/jfe/form/SV_55bovSWW2AlnNwG')
  // back link
  // cy.get('.govuk-back-link').click()
  // cy.contains('You can find help, services and activities in your local area, including:');
})

//feedbackPage
Cypress.Commands.add('feedbackPage',()=>{
  
  cy.contains("This survey is to get your feedback on ‘Manage family support services and accounts'.")
})
//privacy page
Cypress.Commands.add('privacyPageContent',()=>{
  
  cy.contains("Privacy notice ‘Manage family support services and accounts’ is provided by the Department for Education (DfE).")
  cy.contains("The Department for Education is joint data controller with various local authorities for data collected within this service. The local authority that your account is associated with shares data controller responsibility for your account with DfE.")
  cy.contains("A data controller determines how and why personal data is processed. For more information, read the Department for Education’s entry in the Data Protection Public Register.")
})
// terms and conditions page
Cypress.Commands.add('termsandconditionsPage',()=>{
 
  cy.contains("Terms and conditions")
  cy.contains('Welcome to Connect families to support and Manage family support services and accounts (our services). Our services are run by the Department for Education and their use is subject to these terms and conditions.')
  cy.contains("Connect families to support allows professionals who work with families to:")
  cy.contains("Last updated 20 October 2023.")
})
