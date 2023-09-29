describe('| footerlinks | accessibility, contact us, cookies , feedback , terms & conditions | ', { tags: ['LAMan'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
    })

    it('Accessibility page / link',function(){
        cy.get('.govuk-link--inverse').contains('My account').click()
        cy.myaccountPage()
        cy.get('.govuk-footer__inline-list > :nth-child(1) > .govuk-footer__link').click()
        cy.accessibilityPage()  
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage family support services and accounts');
    })

    it('Contact Us page / link',function(){
        cy.visit('/')
        cy.get('.govuk-footer__inline-list > :nth-child(2) > .govuk-footer__link').click()
        cy.contactUsPage()   
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage family support services and accounts');
    })
    it('Cookies page / link',function(){
        cy.visit('/')
        cy.get('.govuk-footer__inline-list > :nth-child(3) > .govuk-footer__link').click()
        cy.cookiesPageContent()
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage family support services and accounts');   
    })
    it('Feedback page / link',function(){
        cy.visit('/')
        cy.get('.govuk-footer__inline-list > :nth-child(4) > .govuk-footer__link').click()
        cy.feedbackPage()   
    })
    it('Privacy page / link',function(){
        cy.visit('/')
        cy.get('.govuk-footer__inline-list > :nth-child(5) > .govuk-footer__link').click()
        cy.privacyPageContent()  
        // back link
        cy.get('.govuk-back-link').click()
        cy.contains('Manage family support services and accounts');
    })
    it('Terms & conditions page / link',function(){
        cy.visit('/')
        cy.get(':nth-child(6) > .govuk-footer__link').click()
        cy.termsandconditionsPage()   
    })

})