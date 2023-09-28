/* eslint-disable max-len */

describe('| cookiesTest.spec | Manage CookiesTest |', function() {

     beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it(`Cookies Main Banner `, function() {
        cy.visit('/')
        cy.cookies();
    });
    it(`No cookies selection made`, function() {
        cy.clearCookies();
        cy.visit(`/`);
        cy.getCookie('manage_family_support_cookies_policy').should('not.exist');
    });
    it(`Accept Cookies ,Hide Banner`, function() {
        cy.clearCookies();
        cy.visit(`/`);
        cy.contains('Accept analytics cookies').wait(500).click().wait(500);
        cy.get('.js-cookie-banner-confirmation-accept > .govuk-button-group > .govuk-button').wait(200).click();

        cy.getCookie('manage_family_support_cookies_policy').should('not.be.empty')
        cy.getCookie('manage_family_support_cookies_policy')
            .should('have.property','value', '{"analytics":true,"version":1}')
        cy.clearCookies();
    });

    it(`Reject Cookies ,Hide Banner`, function() {
        cy.clearCookies();
        cy.visit(`/`);
        cy.contains('Reject analytics cookies').wait(500).click().wait(500);
        cy.get('.js-cookie-banner-confirmation-reject > .govuk-button-group > .govuk-button').wait(200).click();
        cy.getCookie('manage_family_support_cookies_policy').should('not.be.empty')
        cy.getCookie('manage_family_support_cookies_policy')
        .should('have.property','value', '{"analytics":false,"version":1}')  
        cy.clearCookies();
    });

    it(`View Cookies page - Yes Selection `, function() {
        cy.clearCookies();
        cy.visit(`/`);
        // view cookies and accept 
        cy.get('.govuk-button-group > a').click();
        cy.cookiesPageContent()
        cy.get('#analytics-cookies-yes').click()
        cy.get('.js-cookies-page-form > .govuk-button').click()
        cy.getCookie('manage_family_support_cookies_policy').should('not.be.empty')
        cy.getCookie('manage_family_support_cookies_policy')
            .should('have.property','value', '{"analytics":true,"version":1}')
        cy.get('.govuk-notification-banner').contains('You’ve set your cookie preferences.');
        cy.get('.govuk-notification-banner').contains('Go back to the page you were looking at').click();
        cy.get('.govuk-heading-l').contains('Manage family support services and accounts');
        // back link on cookies page
        cy.clearCookies();
        cy.visit(`/`);
        cy.get('.govuk-button-group > a').click();
        cy.cookiesPageContent()
        cy.get('.govuk-back-link').click()
        cy.get('.govuk-heading-l').contains('Manage family support services and accounts');
    });

    it(`View Cookies page - No Selection `, function() {
        cy.clearCookies();
        cy.visit(`/`);
        // view cookies and accept 
        cy.get('.govuk-button-group > a').click();
        cy.cookiesPageContent()
        cy.get('#analytics-cookies-no').click()
        cy.get('.js-cookies-page-form > .govuk-button').click()
        cy.getCookie('manage_family_support_cookies_policy').should('not.be.empty')
        cy.getCookie('manage_family_support_cookies_policy')
            .should('have.property','value', '{"analytics":false,"version":1}')
        cy.get('.govuk-notification-banner').contains('You’ve set your cookie preferences.');
        cy.get('.govuk-notification-banner').contains('Go back to the page you were looking at').click();
        cy.get('.govuk-heading-l').contains('Manage family support services and accounts');
        // back link on cookies page
        cy.clearCookies();
        cy.visit(`/`);
        cy.get('.govuk-button-group > a').click();
        cy.cookiesPageContent()
        cy.get('.govuk-back-link').click()
        cy.get('.govuk-heading-l').contains('Manage family support services and accounts');
    });
    it(`Cookies on all pages - dfe admin creating an LA account`, function() {
        const num = Date.now();
        const n = num.toString();
        const emailAddress = n + 'abcdef@def.com';
        const fullName = 'Happy Yak' + n;

        // As a DFE Admin  creating an LA account
        cy.clearCookies();
        cy.visit('/')
        cy.cookies();
        cy.integrationLogin('dfeadmin')
        cy.cookies();        
        cy.gotoAddPermissionsPage()
        cy.cookies();
        cy.typeOfUserPage('vcs')
        cy.cookies();
        cy.typeOfUserVCS('1')
        cy.cookies();
        cy.selectWhichLA('redbridge', 'ForUserTypeVcs')
        cy.cookies();
        cy.whichOrgVcs('cranbrook')
        cy.cookies();
        cy.email(emailAddress)
        cy.cookies();
        cy.fullName(fullName)
        cy.cookies();
        cy.checkAnswerPage()
        cy.cookies();
        cy.deleteUser(emailAddress, fullName)
        cy.cookies();
    
    })

    // mobile version cookies 
    let device = ['iphone-x','samsung-s10']
        for(let i=0;i<device.length;i++){
  
    it(`Device name - ${device[i]} Cookies Main Banner `, function() {
        cy.viewport(`${device[i]}`)
        cy.clearCookies();
        cy.visit(`/cookies`);
        cy.cookies();
    });

    it(`Device name - ${device[i]} No cookies selection made`, function() {
        cy.clearCookies();
        cy.viewport(`${device[i]}`)
        cy.visit(`/`);
        cy.getCookie('manage_family_support_cookies_policy').should('not.exist');
    });
        }
});