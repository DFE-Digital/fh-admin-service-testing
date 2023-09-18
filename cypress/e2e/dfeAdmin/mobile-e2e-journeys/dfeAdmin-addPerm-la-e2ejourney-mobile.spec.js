import { getDateString } from '../../../support/helperFunctions';

describe('| 📱 addPerm-la-e2ejourney-mobile |', { tags: ['dfeAdmin'] }, () => {
    var n;
    var emailAddress;
    var fullName;

    beforeEach(() => {
        n = getDateString();
        emailAddress = n + '+abcdef@def.com';
        fullName = n + '+John Paul Smith';
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    afterEach(() => {
        cy.deleteUser(emailAddress, fullName)
    })

    it(`ipad-mini - LA Journey - Validate mobile version`, function () {
        cy.viewport(`ipad-mini`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    it('iphone - LA Journey - Validate mobile version', () => {
        cy.viewport(`iphone-x`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })

    it('samsung-s10 - LA Journey - Validate mobile version', () => {
        cy.viewport(`samsung-s10`)
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        cy.gotoAddPermissionsPage()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('1')
        cy.laWhichLA('redbridge')
        cy.email(emailAddress)
        cy.fullName(fullName)
        cy.checkAnswerPage()
        cy.confirmationPage(fullName)
    })
})