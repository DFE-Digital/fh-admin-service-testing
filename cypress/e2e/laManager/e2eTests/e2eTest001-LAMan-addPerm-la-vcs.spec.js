import { getDateString } from '../../../support/helperFunctions';

describe('| e2eTest001-addPerm-la-vcs.spec | add permission - la , vcs journey ',{ tags: ['LAMan'] },function(){
    var n;
    var emailAddress;
    var fullName;

    beforeEach(()=> {
        n = getDateString();
        emailAddress = n + 'abcdef@def.com';
        fullName = n + 'John Paul Smith';
        cy.integrationLogin('laman') 
	})

    afterEach(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    // creating an LA account
    it('LA route ',()=>{
		cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('Tower Hamlets Council', 'la')
        cy.typeOfUserLA('1')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.contains('Check account details')
        cy.checkAnswerPage()
       cy.confirmationPage(fullName)
    })

    // creating an VCS account
    it('VCS route' ,()=>{
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('Tower Hamlets Council', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('Toyhouse')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})