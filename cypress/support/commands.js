// ***********************************************
/* eslint-disable max-len */


// before each hook with clearing cookies + uncaught exception override
beforeEach(() => {
  
  cy.clearCookies();
    Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        }),
    cy.session('userlogin',()=>{
     cy.visit(`https://${Cypress.env('username')}:${Cypress.env('password')}@signin.integration.account.gov.uk/?prompt=login`, { log: false ,failOnStatusCode: false})
     
        
          cy.visit('https://test.manage-family-support-services-and-accounts.education.gov.uk/', { log: false }) 
          cy.get('.govuk-button').click()
          //
          cy.get('#sign-in-button').click()
          // login email
          cy.get('#email').blur({ force: true })
          cy.get('#email').type(`${Cypress.env('oneloginusername')}`, { log: false })
          cy.get('form > .govuk-button').click()
          // login password
          cy.get('#password').type(`${Cypress.env('oneloginpassword')}`, { log: false }).blur()
          cy.get('form > .govuk-button').click()
          // check if the user is signed in
          cy.get('.govuk-header__navigation-item').contains('Sign out')

   },
   {
     cacheAcrossSpecs: true
   }
  )
     
    });
    
  // start page - admin-ui
  Cypress.Commands.add('startPage',()=>{
    cy.contains('Manage family support services and accounts')
    cy.get('.govuk-button--start').click()
  })
  // stub login
  Cypress.Commands.add('stubLogin',(userType)=>{
    cy.contains('button', `${userType}.user@stub.com`).click();
  })
// Welcome page 
Cypress.Commands.add('welcomePage',(userType)=>{
    cy.get('.govuk-heading-l govuk-!-margin-bottom-1').contains(`${userType}`)
    cy.title().should('eq', 'Welcome - Manage family support services and accounts - GOV.UK')
    cy.contains('Accounts')
    cy.contains('Local authorities (LAs)')
  })
  // ********************** Accounts *************************
   // Select add permissions
  Cypress.Commands.add('addPermissions',()=>{
    cy.get('#add-permission').click()
  })
  // Type of user page 
Cypress.Commands.add('typeOfUserPage',(permissionType)=>{
    cy.title().should('eq','Type of user - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Who are you adding permissions for?')
    cy.contains('Someone who works for a local authority')
    cy.contains('Someone who works for a voluntary and community sector organisation')
    // select persmission type
    if (permissionType === 'la') {
    cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
  } else if (permissionType === 'vcs'){
     cy.get(`[data-testid="role-for-organisation-type-${permissionType}"]`).click();
  }
  cy.get('.govuk-button').click()
  })

  // what do they need to do - LA
  Cypress.Commands.add('typeOfUserLA',(selection)=>{
     cy.title().should('eq','Type of User La - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('What do they need to do?')
    cy.contains('Add and manage services, family hubs and accounts')
    cy.contains('Make connection requests to voluntary and community sector services')

    // user selects checkboxes 1 , 2 or both
    if (selection === '1') {
      cy.get('[data-testid="LaManager"]').check();
  } else if (selection === '2'){
      cy.get('#LaProfessional').check();
  }
  else if (selection == 'both') {
      cy.get('[data-testid="LaManager"]').check();
      cy.get('#LaProfessional').check();
  }
  cy.get('.govuk-button').click()
  })
 // what do they need to do - VCS
  Cypress.Commands.add('typeOfUserVCS',(selection)=>{
    cy.title().should('eq','Type of user VCS - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('What do they need to do?')
    cy.contains('An organisation should only have one person with permissions to view and manage connection requests.')
    cy.contains('Add and manage services')
    cy.contains('View and respond to connection requests')

    // user selects checkboxes 1 , 2 or both
    if (selection === '1') {
      cy.get('[data-testid="VcsManager"]').check();
  } else if (selection === '2'){
      cy.get('#VcsProfessional').check();
  }
  else if (selection == 'both') {
      cy.get('[data-testid="VcsManager"]').check();
      cy.get('#VcsProfessional').check();
  }
  cy.get('.govuk-button').click()
  })
  //la route - which local authority do they work for ?
  Cypress.Commands.add('laWhichLA',(searchString)=>{
    cy.title().should('eq','Which Local Authority - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Which local authority do they work for?')
    
    cy.get('#LaOrganisationName').click()
    cy.get('#LaOrganisationName').type(searchString)
    cy.get('#LaOrganisationName__option--0').click()
    cy.get('.govuk-button').click()
  })
  //vcs route - which local authority do they work for ?
  Cypress.Commands.add('vcsWhichLA',(searchString)=>{
    cy.title().should('eq','Which Local Authority - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains('Which local authority area do they work in?')
    
    cy.get('#LaOrganisationName').click().clear()
    cy.get('#LaOrganisationName').type(searchString)
    cy.get('#LaOrganisationName__option--0').click()
    cy.get('.govuk-button').click()
  })
  // What's their email address?
  Cypress.Commands.add('email',(emailAdd)=>{
    cy.title().should('eq','User Email - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains("What's their email address?")
    cy.contains('They will use this to sign in to their account.')
    cy.get('#emailAddress').click().clear().type(emailAdd)
    cy.get('.govuk-button').click()
  })
  // What's the user's full name?
  Cypress.Commands.add('fullName',(fullName)=>{
    cy.title().should('eq','User Name - Manage family support services and accounts - GOV.UK')
    cy.pageHeadings().contains("What's their full name?")
    cy.get('#fullName').click().clear().type(fullName)
    cy.get('.govuk-button').click()
  })
  // Check account details page
  Cypress.Commands.add('checkAnswerPage',()=>{
    cy.contains('Check account details')
    cy.get('.govuk-button').click()

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
 // Check confirmation page 
 Cypress.Commands.add('confirmationPage',(name)=>{
    cy.get('.govuk-panel.govuk-panel--confirmation').contains('Permissions added')
    cy.contains('What happens next')
    cy.contains(`We've emailed ${name}:`)
    cy.contains('to let them know their permissions have been set up')
    cy.contains('a link to the service, where they can create their password and set up two-factor authentication')
    //
    cy.contains('Go to homepage').click()
    cy.contains('Add account permissions to manage family support services and manage connection requests.')

 })
 // which organisation do they work for ?
 Cypress.Commands.add('whichOrgVcs',(searchString)=>{
    cy.contains('Which organisation do they work for?')
    cy.contains("Their organisation must be in the directory for it to appear here. If it's not, you can add an organisation.")
    cy.title().should('eq','Which organisation - Manage family support services and accounts - GOV.UK')
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
  Cypress.Commands.add('integrationLogin',()=>{

  cy.session('userlogin',()=>{
     cy.visit(`https://${Cypress.env('username')}:${Cypress.env('password')}@signin.integration.account.gov.uk/?prompt=login`,{failOnStatusCode: false})
        
          cy.visit('https://test.manage-family-support-services-and-accounts.education.gov.uk/') 
          cy.get('.govuk-button').click()
          //
          cy.get('#sign-in-button').click()

          // login email
          cy.get('#email').type(`${Cypress.env('oneloginusername')}`)
          cy.get('form > .govuk-button').click()
          // login password
          cy.get('#password').type(`${Cypress.env('oneloginpassword')}`)
          cy.get('form > .govuk-button').click()
          // check if the user is signed in
          cy.get('.govuk-header__navigation-item').contains('Sign out')

   },
   {
     cacheAcrossSpecs: true
   }
  )
     
   })
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
  // Welcome page - landing
  Cypress.Commands.add('welcomePage',(serviceType,councilName)=>{
    cy.contains('Add account permissions to manage family support services and manage connection requests.')
    cy.contains('View and remove account permissions to manage family support services or manage connection requests.')
    // cy.contains(`${councilName}`)
    if (serviceType === 'add') {
    cy.get('div:nth-of-type(1) > .govuk-heading-m > a').click();
  } else if (serviceType === 'manage'){
     cy.get('div:nth-of-type(2) > .govuk-heading-m > a').click();
  }
  })
  //******* Add services ******
  Cypress.Commands.add('addService',(serviceName)=>{
    cy.contains('What is the name of the service?')
    cy.get('input#service-name').click().clear().type(`${serviceName}`)
    cy.get("form[method='post'] > .govuk-button").click()
    cy.wait(500)
  })
  Cypress.Commands.add('serviceType1',(serviceType)=>{
    cy.contains('What support does the service offer?')
    for (const [key, value] of Object.entries(serviceType)) {
    cy.get(`[data-testid="${key}"]`).check();
    }
})
 Cypress.Commands.add('serviceType2',(serviceType)=>{
    cy.contains('What support does the service offer?')
    for (const [key, value] of Object.entries(serviceType)) {
    cy.get(`[data-testid="${key}"]`).check();
    }
    cy.contains('Continue').click();
})
// dfe branding
Cypress.Commands.add('dfeBrandingAdminUi',()=>{
  cy.get('.govuk-header__container').contains('Department for Education')
  cy.get('.govuk-header__container').contains('Connect families to support')
  cy.should('have.attr', 'href', '/');

  

})




































 // Select support services
 //organisation - bccsource:Organisation ,support - bccprimaryservicetype:38,children - bccagegroup:37,longtermhealthconditions- bccusergroup:56,testconditions - bccusergroupTestDelete:56
  Cypress.Commands.add('selectSupport',(serviceType)=>{
    cy.contains('Select the support you offer')
    for (const [key, value] of Object.entries(serviceType)) {
    cy.get(`[data-testid="${key}"]`).check(value);
    }
    cy.contains('Continue').click();
})  
  // Select ServiceDeliveryType
   Cypress.Commands.add('serviceDeliveryType',(TaxonomySelection)=>{
    cy.contains('How can families use the service?')
     for (const [key, value] of Object.entries(TaxonomySelection)) {  
        cy.get(`[data-testid="${key}"]`).check(value);
      }
     cy.get('.govuk-button').click()
   })
   // Address 
   Cypress.Commands.add('addAddress',()=>{
      cy.get('[data-testid="address-one"]').click().clear().type('address line 1')
      cy.get('[data-testid="address-two"]').click().clear().type('address line 2')
      cy.get('[data-testid="town-city"]').click().clear().type('random town')
      cy.get('[data-testid="post-code"]').click().clear().type('M6 5UJ')
      cy.get('.govuk-button').click()
   })
   // OfferAtFamiliesPlace
   Cypress.Commands.add('OfferAtFamiliesPlace',(selection)=>{
    cy.contains('Can families choose where they use the service?')
      if (selection === 'Yes') {
      cy.get('[data-testid="yes-select"]').check();
    } else if (selection === 'No'){
      cy.get('[data-testid="no-select"]').click();
    }
      cy.get('.govuk-button').click()
    })

   // Who for
   Cypress.Commands.add('whoFor',(selection,minAge,maxAge)=>{
    cy.contains('Can children or young people use the service?')
    if (selection === 'Yes') {
    cy.get('input#Children').check();
    cy.get(`[data-testid="age-min"]`).select(`${minAge}`)
    cy.get(`[data-testid="age-max"]`).select(`${maxAge}`)
  } else if (selection === 'No'){
     cy.get('input#Children-2').click();
  }
    cy.get('.govuk-button').click()
   })

   // What Language
   Cypress.Commands.add('whatLanguage',(selection)=>{
    cy.contains('Which language is the service offered in?')
      //Select A Language
    cy.get("#LanguageCode0.govuk-select").select(`${selection}`);
    cy.contains('Continue').click()
   })
   // 
   Cypress.Commands.add('addLanguage',(selection1,selection2)=>{
    cy.contains('Which language is the service offered in?')
    cy.get("#LanguageCode0.govuk-select").select(`${selection1}`);
    cy.contains('button', 'Add another language').click();
      //Select A Language
    cy.get("#LanguageCode1.govuk-select").select(`${selection2}`);
    cy.contains('Continue').click()
   })

   //pay for service
   Cypress.Commands.add('payForService',(selection,amount,per)=>{
    cy.contains('Does the service cost money to use?')
    if (selection === 'Yes') {
    cy.get('input#pay-service').check().wait(500);
    cy.get('input#Cost').click().clear().type(`${amount}`)
    cy.get(`[value="${per}"]`).click()
  } else if (selection === 'No'){
     cy.get('input#pay-service-2').click();
  }
    cy.get('.govuk-button').click()
   })
   // multiple contact details
    Cypress.Commands.add('multiContactDetails',(selection,category,data,selection1,category1,data1,selection2,category2,data2,selection3,category3,data3)=>{
    cy.contains('How can people contact the service?')
      cy.get('.govuk-checkboxes').contains(`${selection}`).click();
      cy.get(`input#contact-by-${category}`).click().clear().type(`${data}`);
        cy.get('.govuk-checkboxes').contains(`${selection1}`).click();
      cy.get(`input#contact-by-${category1}`).click().clear().type(`${data1}`);
        cy.get('.govuk-checkboxes').contains(`${selection2}`).click();
      cy.get(`input#contact-by-${category2}`).click().clear().type(`${data2}`);
        cy.get('.govuk-checkboxes').contains(`${selection3}`).click();
      cy.get(`input#contact-by-${category3}`).click().clear().type(`${data3}`);
    cy.get('.govuk-button').click()
   })
   // contact details
   Cypress.Commands.add('contactDetails',(ContactSelection,data)=>{
     cy.contains('How can people contact the service?')
    for (const [key, value] of Object.entries(ContactSelection)) {
    cy.get(`[id="ContactSelection${key}"]`).check(value);
    cy.get(`[id="contact-by-${value}"]`).type(`${data}`)
    }
    cy.contains('Continue').click();
   })
   // service description
   Cypress.Commands.add('moreDetails',(data)=>{
    cy.contains('More details')
    cy.get('textarea#with-hint').click().clear().type(`${data}`)
    cy.get('.govuk-button').click()
   })
   // check details
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
  // Delete permissions 
  Cypress.Commands.add('deletePermissionsLink',()=>{
    cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('Delete').click()
    cy.contains('This will remove all permissions that have been given to')
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

//------------------NHS safeguarding page----------------------
Cypress.Commands.add('checkSafeGuardingPagePanelText', (expectedPanelText) => {
    cy.get('.interrupt-panel p').should('have.text',expectedPanelText)
})

Cypress.Commands.add('checkSafeGuardingPageContinueButton', (expectedContinueLink) => {
    cy.get('.app-button--inverted').invoke('attr', 'href').then((href) => {
		expect(href).to.contain(expectedContinueLink);
		cy.get('.app-button--inverted').click();
		cy.url().should('include',expectedContinueLink);
	})
})

//-------------------------Address page------------------------------------
Cypress.Commands.add('checkErrorBannerAndMessages', (expectedErrorHeading, expectedErrorText, actualErrorBannerText, actualMessages) => {
    cy.get('.govuk-error-summary__title').invoke('text').then((text) => {
		expect(text.trim()).to.equal(expectedErrorHeading);
	})
	cy.get('.govuk-error-summary__body li').each(($el) => {
		actualErrorBannerText.push($el.text().trim())
		}).then(()=>{
		expect(actualErrorBannerText).to.deep.equal(expectedErrorText)
	})

    cy.get('.govuk-error-message').each(($el) => {
		actualMessages.push($el.text().replace('Error:','').trim().split('\n').shift())
		}).then(()=>{
		expect(actualMessages).to.deep.equal(expectedErrorText)
	})
    console.log(actualMessages)
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

//-----------------------reason for connection request page --------------------------
Cypress.Commands.add('reasonForConnectionRequestPage', ()=> {
    //Enter text in the reason text area
	cy.get('#reason').type('Test connection request');
	//click continue button on reason for connection page
	cy.get('div.govuk-grid-row button').click();
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

//----------------------how can the service contact page -----------------------------
Cypress.Commands.add('selectAllCheckboxes', ()=> {
    // Select all checkboxes
    cy.get('.govuk-checkboxes__input').check();
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


//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })