describe('| healthCheckManage.spec.js | - Manage site API status ', { tags: ['dfeAdmin'] },()=>{
   
  it('Infrastructure Status - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
           expect(response.body.status).to.be.eq('Healthy')
        });
  });  
  it('App Insights - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
          expect(response.body.entries["App Insights"].status).to.be.eq('Healthy')
        });
  });
  it('Idams API - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
          expect(response.body.entries["Idams API"].status).to.be.eq('Healthy')
        });
  });
  it('Referral API - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
           expect(response.body.entries["Referral API"].status).to.be.eq('Healthy')
        });
  });
  it('Service Directory API - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
          expect(response.body.entries["Service Directory API"].status).to.be.eq('Healthy')
        });
  });
  it('Feedback Site - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
          expect(response.body.entries["Feedback Site"].status).to.be.eq('Healthy')
        });
  });
  it('SQL Server - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
         expect(response.body.entries.sqlserver.status).to.be.eq('Healthy')
        });
  });
  it('One Login - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
         expect(response.body.entries["One Login"].status).to.be.eq('Healthy')
        });
  });
  it('Notification API - health check API status', function() {
        cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
          expect(response.body.entries["Notification API"].status).to.be.eq('Healthy')
        });
  });
})