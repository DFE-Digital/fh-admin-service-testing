Cypress.Commands.add('validJsonAPIresponse', (response)=>{
    expect(response.status).to.eq(200);
    expect(response).to.have.property('headers');
    expect(response.headers).to.include({'content-type': 'application/json'});
    expect(response.body).to.not.be.null;
    expect(response.duration).to.not.be.greaterThan(5000);
    expect(response.body.status).to.be.eq('Healthy')
    expect(response.body.entries["App Insights"].status).to.be.eq('Healthy')
    expect(response.body.entries["Idams API"].status).to.be.eq('Healthy')
    expect(response.body.entries["Referral API"].status).to.be.eq('Healthy')
    expect(response.body.entries["Service Directory API"].status).to.be.eq('Healthy')
    expect(response.body.entries["Feedback Site"].status).to.be.eq('Healthy')
    expect(response.body.entries.sqlserver.status).to.be.eq('Healthy')
    expect(response.body.entries["One Login"].status).to.be.eq('Healthy')
    expect(response.body.entries["Notification API"].status).to.be.eq('Healthy')
});