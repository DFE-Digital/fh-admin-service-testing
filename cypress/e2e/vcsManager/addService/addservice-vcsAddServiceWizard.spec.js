describe("| addPerm-la-checkAnswerPage | FHG-3911 LA manager - add permissions - check account details page", { tags: ['LAMan'] }, () => {
     beforeEach(()=> {
		cy.visit('/')
        	cy.integrationLogin('vcsman')
       
	})
    
    it('AC1 - add a service name and validate content',()=>{
        cy.visit('/')
        cy.visit('/ServiceWizzard/ServiceName')
        cy.contains('h1', 'What is the name of the service?');
        cy.get('#service-name')
        cy.get('#service-name')
            .should('be.visible')
            .click()
            .clear()
            .type('Fred Bloggs')
        cy.get('[data-testid="name-continue-button"]')
            .contains('Continue')
            .should('be.visible')
            .click()

        cy.contains('legend', 'What support does the service offer?')
        cy.get('[data-testid="activities,clubsandgroups"]').check();
        cy.get('[data-testid="activities"]').check();
        cy.get('[data-testid="button-continue"]')
            .contains('Continue')
            .should('be.visible')
            .click()

        cy.contains('h1', 'Can children or young people use the service?')
        cy.get('[data-testid="yes-select"]').check();
        cy.get('[data-testid="age-min"]').select('1 year old')
        cy.get('[data-testid="age-max"]').select('10 years old')
        cy.get('[data-testid="button-continue"]')
            .contains('Continue')
            .should('be.visible')
            .click()

        cy.contains('h2', 'Which language is the service offered in?')
        cy.get('[data-testid="language-select"]').select('English')
        cy.get('[data-testid="button-continue"]')
            .contains('Continue')
            .should('be.visible')
            .click()

        cy.contains('h1', 'Does the service cost money to use?')
        cy.get('#pay-service').check()
        cy.get('#Cost')
            .should('be.visible')
            .click()
            .clear()
            .type('2.50')
        cy.get('#cost-unit').check()
        cy.get('[data-testid="button-continue"]')
            .contains('Continue')
            .should('be.visible')
            .click()

        cy.contains('legend', 'Does this service take place on set days and times?')
        cy.get('#HastimesChoice').check()
        cy.contains('button', 'Continue')
            .should('be.visible')
            .click()
        
    })
    
})