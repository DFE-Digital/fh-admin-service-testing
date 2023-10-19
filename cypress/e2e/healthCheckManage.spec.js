describe('| healthCheckManage.spec.js | - Manage site API status ', { tags: ['dfeAdmin'] },()=>{
   
    it('health check API status', function() {
    cy.request('/health',{failOnStatusCode: false})
        .then((response) => {
          cy.validJsonAPIresponse(response);
        });
  });
})