describe.skip('addPerm-errorPages - all error pages 404,500 ',()=>{
    it('When user logs in with insufficient credentials - error page - *** not implemented ***',()=>{
         cy.visit('/AccountAdmin/TypeOfRole', {failOnStatusCode: false})

    })
    it('error pages - 400 , 500 ,404, error/test',function(){
        const pages = ['400','500','404']
        for (let i=0; i < pages.length;i++){
            cy.visit(`/${pages[i]}`,{failOnStatusCode: false})
            // cy.visit('/error/test',{failOnStatusCode: false})
            // cy.contains('Sorry, there is a problem with the service')
            // cy.contains('Page not found')
            // cy.contains('If you typed the web address, check it is correct.')
            // cy.contains('If you pasted the web address, check you copied the entire address.')
            // cy.contains('If the problem continues, email us at find-support-for-your-family.service@education.gov.uk')
        }
        
    })

})