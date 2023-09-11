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
    
  // start page - admin-ui
  Cypress.Commands.add('startPage',()=>{
    cy.contains('Manage family support services and accounts')
    cy.get('.govuk-button--start').click()
    cy.contains('This is to manage family support services.')
    cy.contains('Use this to:')
    cy.contains('add local authorities')
    cy.contains('add VCS organisations to the directory')
    cy.contains('view organisations you have added to the directory')
  })
  // stub login
  Cypress.Commands.add('stubLogin',(userType)=>{
    cy.contains('button', `${userType}.user@stub.com`).click();
  })
// dfe admin - Welcome page 
Cypress.Commands.add('dfeAdminWelcomePage',()=>{
    cy.get('.govuk-grid-column-two-thirds').contains('Department for Education')
    cy.title().should('eq', 'Welcome - Manage family support services and accounts - GOV.UK')
    cy.contains('Add account permissions to manage family support services and manage connection requests.')
    cy.contains('View and remove account permissions to manage family support services or manage connection requests.')
    //cy.contains('Add a service to the directory.')
    //cy.contains('View, change or delete services shown in the directory.')
    //cy.contains('Add a family hub to the directory.')
    //cy.contains('View, change or delete family hubs shown in the directory.')
    //cy.contains('Activate an LA before you create its accounts, services and family hubs.')
    // cy.contains('Add a service to the directory.')
    //cy.contains('View, change or delete services shown in the directory.')
    cy.contains('Add an organisation before adding permissions for its users.')
    cy.contains('View, change or delete existing organisations.')
    cy.contains('Upload an excel spreadsheet.')
  })

// LA Manager - Welcome page 
Cypress.Commands.add('LAManWelcomePage',(LA)=>{
    cy.get('.govuk-grid-column-two-thirds').contains(`${LA}`)
    cy.title().should('eq', 'Welcome - Manage family support services and accounts - GOV.UK')

    cy.contains('Add permissions')
    cy.contains('Manage permissions')
    
    cy.contains('Activate a local authority')
      .should('not.exist');
    cy.contains('Add a VCS service')
      .should('not.exist');
    cy.contains('Manage VCS services')
      .should('not.exist');

    cy.contains('Add an organisation')
    cy.contains('Manage organisations')
  })




  // ********************** Accounts *************************

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
    cy.get('.govuk-button').click()
  })





  //vcs route - which local authority do they work for ?
  Cypress.Commands.add('vcsWhichLA',(searchString)=>{
    cy.title().should('eq','Which local authority area do they work in? - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Which local authority area do they work in?')
    
    cy.get('#LaOrganisationName').click().clear()
    cy.get('#LaOrganisationName').type(searchString)
    cy.get('#LaOrganisationName__option--0').click()
    cy.get('.govuk-button').click()
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
// Change links 
Cypress.Commands.add('clickOnChangeLinkFor', (key)=> {
    cy.get('.govuk-summary-list__row')
    .filter((index, element) => {
        const keyElement = Cypress.$(element).find('.govuk-summary-list__key');
        return keyElement.text().trim() === key;
    })
    .find('a')
    .click();
})

 // which organisation do they work for ?
 Cypress.Commands.add('whichOrgVcs',(searchString)=>{
    cy.contains('Which organisation do they work for?')
    cy.contains("Their organisation must be in the directory for it to appear here. If it's not, you can add an organisation.")
    cy.title().should('eq','Which organisation do they work for? - Manage family support services and accounts - GOV.UK')
    cy.get('#VcsOrganisationName').click().clear().type(searchString)
    cy.get('#VcsOrganisationName__option--0').click()
    cy.get('.govuk-button').click()
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
 cy.get('.govuk-button').click()
 cy.contains('Check details')

 })
// Add organisation VCS - check details page 
Cypress.Commands.add('checkDetailsPage',()=>{
  cy.contains('Check details')
  cy.title().should('eq','Check details - Manage family support services and accounts - GOV.UK')
  cy.get('.govuk-button').click()
})
// Add organisation VCS - confirmation page 
Cypress.Commands.add('addVcsOrgConfirmation',()=>{
  cy.contains('Voluntary community organisation added')
  cy.title().should('eq','Voluntary community organisation added - Manage family support services and accounts - GOV.UK')
  cy.contains('What happens next')
  cy.contains('You can now create user accounts for the organisation.')
  cy.contains('You can do this from your homepage.')
  cy.get('.govuk-button').click()
  cy.contains('Add account permissions to manage family support services and manage connection requests.')

})
// mobile menu
Cypress.Commands.add('myaccountMob',()=>{
  cy.get('.govuk-header__container').contains('Sign out').should('not.be.visible') 
  cy.get('.govuk-header__menu-button').click()
  cy.get('.govuk-header__container').contains('Sign out')
  cy.get('.govuk-header__container').contains('My account')
  cy.get('.govuk-header__menu-button').click()
  cy.get('.govuk-header__container').contains('Sign out').should('not.be.visible') 
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

Cypress.Commands.add('managelogin', (olusername, olpassword) => {
    cy.session([olusername, olpassword], () => {

        cy.visit(`https://${Cypress.env('username')}:${Cypress.env('password')}@signin.integration.account.gov.uk/?prompt=login`, { failOnStatusCode: false })
        cy.visit('https://test.manage-family-support-services-and-accounts.education.gov.uk/') 
        cy.get('.govuk-button').click()
        //
        cy.get('#sign-in-button').click()
        // login based on type of user 
        // login email
        cy.get('#email').type(`${Cypress.env(olusername)}`)
        cy.get('form > .govuk-button').click()
        // login password
        cy.get('#password').type(`${Cypress.env(olpassword)}`)
        cy.get('form > .govuk-button').click()
        cy.visit('/')
    })
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
  if (userType == 'dfeadmin'){
  // login email
  cy.get('#email').type(`${Cypress.env('oneloginusername')}`)
  cy.get('form > .govuk-button').click()
  // login password
  cy.get('#password').type(`${Cypress.env('oneloginpassword')}`)
  }
  else if ( userType == 'laman'){
  // login email
  cy.get('#email').type(`${Cypress.env('lamanoneloginusername')}`)
  cy.get('form > .govuk-button').click()
  // login password
  cy.get('#password').type(`${Cypress.env('lamanoneloginpassword')}`)
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


// ********************** Voluntary community organisations (VCSs) *************************
// manage VCS Organisation link
Cypress.Commands.add('manVcsLink',()=>{
  cy.contains('Manage VCS organisations').click()
  cy.contains('Manage organisations')
  cy.contains('View, change or delete existing organisations.')
  cy.title().should('eq','Manage organisations - Manage family support services and accounts - GOV.UK')
})
Cypress.Commands.add('laManVcsLink',()=>{
  cy.contains('Manage organisations').click()
  cy.contains('Manage organisations')
  cy.contains('View, change or delete existing organisations.')
  cy.title().should('eq','Manage organisations - Manage family support services and accounts - GOV.UK')
})
// View VCS Organisation link
Cypress.Commands.add('manVcsView',()=>{
  cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('View').click()
  cy.contains('Back to manage local authorities and organisations')


})
// Delete VCS Organisation link
Cypress.Commands.add('manVcsDel',()=>{
  cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
})
// view vcs organisation 
Cypress.Commands.add('manVcsViewPage',(orgName,LA)=>{
  cy.get('.govuk-heading-l').contains(`${orgName}`)
  cy.get('#OrganisationName').contains(`${orgName}`)
  cy.get('#LocalAuthority').contains(`${LA}`)
  cy.get('#OrganisationType').contains('Voluntary community organisation')
  cy.title().should('eq',`${orgName} - Manage family support services and accounts - GOV.UK`)
 

})
// Edit VCS Org Name 
Cypress.Commands.add('editVcsName',(orgName)=>{
  cy.get('.govuk-link').contains('Change').click()
  cy.contains("What is the organisation's name?")
  cy.get('#organisationName').click().clear().type(orgName)
})
// add VCS Org confirmation page 
Cypress.Commands.add('addVcsOrgConfirm',()=>{
  cy.get('.govuk-button').click()
  cy.contains('You have saved these details')
  cy.contains('Any changes will show in the directory straight away.')
  cy.title().should('eq',`You have saved these details - Manage family support services and accounts - GOV.UK`)
  cy.get('.govuk-button').click()

})
  
  // Sign in page
  Cypress.Commands.add('signInPage',()=>{
    cy.contains('Sign in to your account')
    cy.get('.govuk-button').click()
  })
 
  // Page headings 
  Cypress.Commands.add('pageHeadings',()=>{
    cy.get('.govuk-fieldset__heading')
  })
  // Choose Organisation
  Cypress.Commands.add('chooseOrganisation',(selection)=>{
    cy.contains('Which type of organisation')
    cy.get("select#SelectedOrganisation").select(`${selection}`)
    cy.get('.govuk-button').click()

  })

//    // check details
   Cypress.Commands.add('checkDetails',(serviceName,supportType)=>{
    cy.contains('Check the service details')
    cy.get('.govuk-summary-list').contains(`${serviceName}`)
    cy.get('.govuk-summary-list').contains(`${supportType}`)
    cy.contains('Confirm details').click()
   })
   // confirmation page
   Cypress.Commands.add('serviceAdded',()=>{
    cy.contains('Service added')
    cy.contains('Go to home page').click()
    cy.contains('Add a service')
   })

   // ************* Manage Permissions **************************************
   // Select manage permissions link
  Cypress.Commands.add('managePermissionsLink',()=>{
   cy.get(':nth-child(5) > :nth-child(2) > .govuk-heading-s > a').click()
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
  // Delete permissions link
  Cypress.Commands.add('deletePermissionsLink',()=>{
    cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
    cy.contains('This will remove all permissions that have been given to')
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
    cy.get('p > a').click()
  })
  //email filter 
  Cypress.Commands.add('emailFilter',(email)=>{
    cy.get(':nth-child(2) > :nth-child(1) > .govuk-form-group > .govuk-fieldset > #userName').click().clear().type(`${email}`)
    cy.get('#filters-component > .govuk-button').click()
    

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

   

 

  //******************************* OLD  manage services ******************************

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
   // delete confirmation
   Cypress.Commands.add('deleteConfirm',(selection)=>{
    cy.contains('Deleting a service')
     if (selection === 'Yes') {
    cy.get('[value="Yes, I want to delete it"]').check();
    cy.get('.govuk-button').click()
    cy.contains('You have deleted the service')
  } else if (selection === 'No'){
     cy.get('[value="No, I want to keep it"]').check();
      cy.get('.govuk-button').click()
     cy.contains('You have not deleted the service')
  }
    cy.get('.govuk-button').click()
    cy.contains('Add a service to the directory.')
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
// delete test data service 
Cypress.Commands.add('deleteTestData',(serviceId)=>{
  // cy.visit('/OrganisationAdmin/Welcome')
  // cy.get('[data-testid="manage-services"]').click()
  cy.get(`[data-testid="${serviceId}-delete"]`).click();
  cy.get('[value="Yes, I want to delete it"]').check();
  cy.get('.govuk-button').click()

})
// make changes on confirm page
Cypress.Commands.add('editTitle',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(1) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('checkDetailsEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.contains('Save details').click()
  cy.contains('Go to home page').click()
})
Cypress.Commands.add('typeOfServiceEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(2) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('serviceDeliveryTypeEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(3) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('whoForEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(4) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('whatLanguageEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(5) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('payForServiceEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(6) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('contactDetailsEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(7) > .govuk-summary-list__actions > .govuk-link').click()
})
Cypress.Commands.add('moreDetailsEdit',(serviceId)=>{
  cy.contains(`${serviceId}`)
  cy.get('div:nth-of-type(8) > .govuk-summary-list__actions > .govuk-link').click()
})

//-------------------Common page commands ----------------------
Cypress.Commands.add('checkPageHeading', (locator, expectedHeading) => {
    cy.get(locator).invoke('text').then((text) => {
		const trimmedText = text.trim();
		expect(trimmedText).to.equal(expectedHeading);
	})
})

Cypress.Commands.add('checkLinkHref', (locator, nhsLink) => {
    cy.get(locator).invoke('attr', 'href').then((href) => {
		expect(href).to.equal(nhsLink);
	})
})

Cypress.Commands.add('clickBackLink', ()=> {
    cy.get('.govuk-back-link').click();
})

Cypress.Commands.add('getTextOfElements', (locator, actualList, expectedList) => {
    cy.get(locator).each(($element) => {
		const text = $element.text();
		actualList.push(text);
		}).then(() => {
		expect(actualList).to.deep.equal(expectedList);
		})
})

Cypress.Commands.add('getRadioButtonsAndCheckboxes', (locator, actualRadioButtons, expectedRadioButtons)=> {
    cy.get(locator).each(($el) => {
		actualRadioButtons.push($el.text().trim())
		}).then(()=>{
		expect(actualRadioButtons).to.deep.equal(expectedRadioButtons)
	})
})

Cypress.Commands.add('checkTextOf', (locator, expectedText)=> {
    cy.get(locator).invoke('text').then((text)=> {
        expect(text.trim()).to.equal(expectedText);
    })
})

Cypress.Commands.add('checkValueOfTextBox', (locator, expectedText)=> {
    cy.get(locator).invoke('attr', 'value').then((value)=> {
        expect(value).to.equal(expectedText);
    })
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

//-----------------------Consent page---------------------------
Cypress.Commands.add('checkErrorText', (expectedErrorHeading, expectedErrorText) => {
    cy.get('.govuk-error-summary__title').invoke('text').then((text) => {
		expect(text.trim()).to.equal(expectedErrorHeading);
	})
	cy.get('.govuk-error-summary__body').invoke('text').then((text) => {
		expect(text.trim()).to.equal(expectedErrorText);
	})
    cy.get('.govuk-error-message').invoke('text').then((text) => {
		expect(text.replace('Error:','').trim().split('\n').shift()).to.equal(expectedErrorText);
	})
})

Cypress.Commands.add('selectRadioButtonAndContinue', (radioLocator, continueLocator)=> {
    //click on Yes radio button
	cy.get(radioLocator).click();
	//click continue button on consent page
	cy.get(continueLocator).click();
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


Cypress.Commands.add('checkTextOfAllCheckedCheckboxes', (actualCheckedText, expectedCheckedText)=> {
    // Get label text of all checked checkboxes
    cy.get('.govuk-checkboxes__input')
    .filter(':checked')
    .each(($checkbox) => {
    // Get the associated label element and extract its text content
        const labelText = $checkbox.next('.govuk-label').text();
        actualCheckedText.push(labelText.trim());
    }).then(()=> {
      expect(actualCheckedText).to.deep.equal(expectedCheckedText);
  });
})

Cypress.Commands.add('selectCheckBoxes', (label)=> {
    cy.contains('label', label)
    .parent()
    .find('input')
    .check();
})

Cypress.Commands.add('uncheckSelectedCheckboxes', ()=> {
    cy.get('.govuk-checkboxes__input:checked').uncheck();
})

//----------------------------Check details page ------------------------
Cypress.Commands.add('checkRequestDetails', (expectedContent)=> {
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

Cypress.Commands.add('clickOnChangeLinkFor', (key)=> {
    cy.get('.govuk-summary-list__row')
    .filter((index, element) => {
        const keyElement = Cypress.$(element).find('.govuk-summary-list__key');
        return keyElement.text().trim() === key;
    })
    .find('a')
    .click();
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

 cy.get('.govuk-button').click()
 cy.contains('You have successfully uploaded your data')

})