import { getDateString } from '../../../support/helperFunctions';

describe('|e2eTest002-addPerm-addVCSOrg | Add permissions - VCS Add Org confirmation page',{ tags: ['LAMan'] },()=>{
    var n;
    var emailAddress;
    var fullName;

    beforeEach(()=> {
        n = getDateString();
        emailAddress = n + '-abcdef@def.com';
        fullName = n + 'John Paul Smith';
        cy.integrationLogin('laman') 
	})
   
    afterEach(() => {
        cy.deleteUser(emailAddress, fullName)
    })
    
    it('e2e test add permissions - add vcs org if it doesnt exist',()=>{
       cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + '+VCS Organisation name')
        cy.contains(n + '+VCS Organisation name')
        // continue
        cy.checkDetailsPage()
        cy.addVcsOrgConfirmation('LaManager')

        // add permissions using this newly added VCS organisation 
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs(n + '+VCS Organisation name')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})