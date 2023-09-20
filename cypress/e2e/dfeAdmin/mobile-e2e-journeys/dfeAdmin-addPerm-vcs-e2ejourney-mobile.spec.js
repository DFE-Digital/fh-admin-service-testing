import { getDateString } from '../../../support/helperFunctions';

describe('| 📱 addPerm-vcs-e2ejourney-mobile | ', { tags: ['dfeAdmin'] }, () => {
    var n;
    var emailAddress;
    var fullName;

    beforeEach(() => {
        n = getDateString();
        emailAddress = n + '+abcdef@def.com';
        fullName = n + 'John Paul Smith';
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it(`iphone-x - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('redbridge', 'ForUserTypeVcs')
        cy.whichOrgVcs('cranbrook')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    it(`samsung-s10 - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('redbridge', 'ForUserTypeVcs')
        cy.whichOrgVcs('cranbrook')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    it(`ipad-mini - VCS Journey - Validate mobile version`, function () {
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('1')
        cy.selectWhichLA('redbridge', 'ForUserTypeVcs')
        cy.whichOrgVcs('cranbrook')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

})