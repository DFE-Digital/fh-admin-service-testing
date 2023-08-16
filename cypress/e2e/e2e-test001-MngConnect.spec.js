
describe('| e2e-test001-MngConnect | Manage - add VCS organisation , add la and vcs permissions , Connect - create and approve request , view requests', () => {

    afterEach(() => {
        if (Cypress.mocha.getRunner().suite.ctx.currentTest.state === 'failed') {
            Cypress.runner.stop()
        } 
    })

    it('Manage - (dfe admin) Add VCS organisation using spread sheet',()=>{
		cy.visit('/')
        cy.managelogin('oneloginusername', 'oneloginpassword')
        cy.visit('/Welcome')
        cy.dfeAdminWelcomePage()
        cy.uploadSheet()  
        cy.get('.govuk-header__product-name').click()
        cy.manVcsLink()
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.contains('Test Harsha Madhu Vcs001')
    })
    
    it('Manage - (dfe admin) Add permissions to user LA Professional', () => {  
        cy.visit('/')
        cy.managelogin('oneloginusername', 'oneloginpassword')
        cy.visit('/Welcome')
        cy.dfeAdminWelcomePage()
        cy.addPermissions()
        cy.typeOfUserPage('la')
        cy.typeOfUserLA('2')
        cy.laWhichLA('tower hamlets')
        cy.email('harshare139@googlemail.co')
        cy.fullName('TH - LA Pro')
        cy.checkAnswerPage()
        cy.confirmationPage('TH - LA Pro')
    })
    
    it('Manage - (dfe admin) Add permissions to user VCS Professional', () => {  
        cy.visit('/')
        cy.managelogin('oneloginusername', 'oneloginpassword')
        cy.visit('/Welcome')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('2')
        cy.vcsWhichLA('tower hamlets')
        cy.whichOrgVcs('Test Harsha Madhu Vcs001')
        cy.email('harshareddy.leeds@googlemail.co')
        cy.fullName('TH - VCS Pro')
        cy.checkAnswerPage()
        cy.confirmationPage('TH - VCS Pro')
    })


    it('Connect - (la Professional) Create and view connection request ',()=>{
        cy.visit('https://test.connect-families-to-support.education.gov.uk');
        cy.refServLanding();
        cy.searchbypostcode('E1 5NP');
        cy.get('ul.search-results>li:nth-child(1) a').click();
        cy.get('.govuk-grid-column-two-thirds > .govuk-button').each(($el) => {
            const href = $el.attr('href');
            const serviceid = href.substring(45)
            cy.connectlogin('oneloginLAusername', 'oneloginpassword', serviceid);
            cy.visit(`https://test.connect-families-to-support.education.gov.uk/ProfessionalReferral/Safeguarding?serviceId=${serviceid}`);
        });
        cy.get('.app-button--inverted').click();
        cy.selectRadioButtonAndContinue('#shared-privacy-yes', 'div.govuk-grid-row button');
        cy.selectRadioButtonAndContinue('#consent-yes', 'div.govuk-grid-row button');
        cy.enterTextAndContinue('.govuk-input', 'James Bond', 'div.govuk-grid-row button');
        cy.reasonForConnectionRequestPage();
        cy.selectCheckBoxes('Email');
        cy.get('div.govuk-grid-row button').click();
        cy.enterTextAndContinue('.govuk-input', 'a@test.com', 'div.govuk-grid-row button');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#reason').type('Test service engage with this family');
        cy.get('div.govuk-grid-row button').click();
        cy.get('#telephone-and-email').click();
        cy.enterTextAndContinue('.govuk-input', '01132 347 902', 'div.govuk-grid-row button');
        cy.contains('Confirm details and send request').click();
        cy.checkPanelText('Connection request sent');
    })
    // session details change - sign in as LA Pro = user id = harshareddy.leeds@googlemail.com

    it.skip('Connect Dashboard - (VCS Professional ) view and accept requests ',()=>{
        cy.visit('/')
    })

    it('Manage - ( dfe admin) - delete LA Professional user permissions',()=>{
        cy.visit('/')
        cy.managelogin('oneloginusername', 'oneloginpassword')
        cy.visit('/Welcome')
        cy.dfeAdminWelcomePage()
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.emailFilter('harshare139@googlemail.com')
        // delete permissions link
        cy.deletePermissionsLink()
        cy.deletePermissionsOptionPage('TH - LA Pro','Yes')
        cy.deletePermissionsConfirmPage('TH - LA Pro')
    })

    it('Manage - (dfe admin) delete VCS organisation',()=>{
		cy.visit('/')
        cy.managelogin('oneloginusername', 'oneloginpassword')
        cy.visit('/Welcome')
        cy.dfeAdminWelcomePage()
        cy.manVcsLink()
        cy.get('.govuk-pagination__list li:last-child').click();
        cy.get('td.govuk-table__cell a[data-testid="delete_TestHarshaMadhuVcs001"]').click();
        cy.contains('Deleting an organisation');
        cy.selectRadioButtonAndContinue('#removeOrg', 'button.govuk-button')
        cy.contains('You have deleted Test Harsha Madhu Vcs001')
	})
})