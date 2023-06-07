describe.skip('| e2e-ManServ_010 | Manage Service - view - Change ContactDetails ',function(){
    it('Change ContactDetails - Salford City Council - Journey - Manage Service - edit ',function(){
         cy.visit('/')
        // start page 
        cy.startPage()
        //sign in page
        cy.signInPage()
        // choose organisation
        cy.chooseOrganisation('Salford City Council')
        const num = Date.now();
        const n = num.toString();
        // select add service
        cy.welcomePage('add','Salford City Council')
        // give service name
        cy.addService('TestService' + n)
        // select required service(s)
        // select required service(s)
        cy.serviceType1({transport:'be261f9e-f024-46f8-8b5b-58251f25388d'})
        cy.serviceType2({communitytransport:'93a29b1e-acd9-4abf-9f30-07dce3378558'})
        //type of service
        cy.serviceDeliveryType({online:'2', telephone:'3'})
        // who is it for ?
        cy.whoFor('No')
        // what language 
        cy.whatLanguage('English')
        //pay for service
        cy.payForService('No')
        //contact details
        cy.contactDetails({Email:'email'},'abc@email.com')
        //more details
        cy.moreDetails('Test details')
        // check details
        cy.checkDetails('TestService' + n,'Community transport')
        // service added 
        cy.serviceAdded()
        // validate added service is present in list
        cy.ViewServices('TestService' + n,)
        // manage service 
       cy.editService('testservice' + n)
      
        // edit payment type
        cy.contactDetailsEdit('TestService' + n)
        //contact details
         cy.contactDetails({Website:'website'},'www.gov.uk')
         // check details
        cy.checkDetailsEdit('TestService' + n,'www.gov.uk')
      // manage service 
        cy.ViewServices('TestService' + n)
       cy.deleteService('testservice' + n)
       // confirm deletion 
       cy.deleteConfirm('Yes')
        
    })
})