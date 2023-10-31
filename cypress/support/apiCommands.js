Cypress.Commands.add('validJsonAPIresponse', (response)=>{
    expect(response.status).to.eq(200);
    expect(response).to.have.property('headers');
    expect(response.headers).to.include({'content-type': 'application/json'});
    expect(response.body).to.not.be.null;
    expect(response.duration).to.not.be.greaterThan(3000);
   
   
});