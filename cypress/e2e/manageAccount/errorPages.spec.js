describe.skip('| errorPages | - all error pages 404,500 ',()=>{
    it('When user logs in with insufficient credentials - error page - *** not implemented ***',{ skipBeforeEach: true },()=>{
         cy.visit('/AccountAdmin/TypeOfRole', {failOnStatusCode: false})

    })
    it.only(
        'error pages - 400 , 500 ,404',
        { skipBeforeEach: true },
        ()=>{
       
        const pages = ['400','500','404']
        for (let i=0; i < pages.length;i++){
            cy.visit('/')
            cy.get('.govuk-header__link').contains('Sign out').click()
            cy.visit(`/${pages[i]}`,{failOnStatusCode: false})
            
            cy.contains('Page not found')
            cy.contains('If you typed the web address, check it is correct.')
            cy.contains('If you pasted the web address, check you copied the entire address.')
            cy.contains('If the problem continues, email us at find-support-for-your-family.service@education.gov.uk')
        }
        
    })

})