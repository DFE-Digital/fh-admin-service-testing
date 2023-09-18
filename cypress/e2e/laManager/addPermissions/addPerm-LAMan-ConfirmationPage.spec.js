import { getDateString } from '../../../support/helperFunctions';

describe("| addPerm-confirmationPage | FHG-3912 LA Manager - add permissions - confirmation page for LA and VCS", { tags: ['LAMan'] }, () => {
    var n;
    var emailAddress;
    var fullName;

    beforeEach(() => {
        n = getDateString();
        emailAddress = n + 'abcdef@def.com';
        fullName = n + 'John Paul Smith';
        cy.visit('/')
        cy.integrationLogin('laman')
    })

    afterEach(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    it('AC 1,2 - validate confirmation page content for LA journey', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'la')
        cy.typeOfUserLA('1')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    it('AC 1,2 - validate confirmation page content for VCS journey', () => {
        cy.visit('/')
        cy.gotoAddPermissionsPage()
        cy.LAManTypeOfUserPage('London Borough of Redbridge', 'vcs')
        cy.typeOfUserVCS('1')
        cy.whichOrgVcs('cranbrook')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})
