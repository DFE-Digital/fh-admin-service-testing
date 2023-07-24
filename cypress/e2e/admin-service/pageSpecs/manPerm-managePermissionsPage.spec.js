describe('| manPerm-managePermissionsPage.spec | FHG-1617 Manage permissions ( Manage User Permissions) Page ',()=>{
    
    it('AC 1 , 4 - page content , back link ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link 
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // back link
        cy.get('.govuk-back-link').click()
        cy.welcomePage()
       
    })
     it('AC 2 - edit permissions link ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // delete permissions link
        cy.editPermissionsLink()   
    })
    it('AC 3 - delete permissions link ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        // delete permissions link
        cy.deletePermissionsLink()
       
    })
    it('AC 5 - Type of user filters - Both LA and VCS ',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.clearFilters()
        // apply LA filter 
        cy.typeOfUserFilter('la')
        cy.contains('Redbridge')
         cy.clearFilters()
        // apply VCS filter
        cy.contains('Cranbrook')
        cy.clearFilters()
        //apply both filters 
        cy.typeOfUserFilter('both')
        // add validations
        // first page has VCS 
        cy.contains('Cranbrook')

        // last page has LA 
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.contains('Redbridge')


    })

    it('AC 6 - Name , Email , Organisation filter',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.clearFilters()
        // name filter 
        cy.nameFilter('1688045232974John Smith')
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('1688045232974John Smith')
        cy.clearFilters()
        // email filter 
        cy.emailFilter('1688539487973++abcdef@def.co.uk')
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('1688539487973++abcdef@def.co.uk')
        cy.clearFilters()
        
        // organisation filter
        cy.organisationFilter('Cranbrook Baptist Church')
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Cranbrook Baptist Church')
        cy.clearFilters()
        // 
        cy.organisationFilter('Suffolk County Council')
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Suffolk County Council')
        cy.clearFilters()

    })
    it('AC 8 , 9 - no result found  + Clear filter',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').should('not.be.empty')
        cy.clearFilters()
        // name filter 
        cy.nameFilter('James Bond')
        cy.contains('No results found')
        cy.contains('Try again by changing or removing filters you applied.')
        // clear filters 
        cy.clearFilters()
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').should('not.be.empty')

    })
    it('AC 11 , 12 Pagination',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage permissions link
        cy.managePermissionsLink()
        cy.managePermissionsPage()
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').should('not.be.empty')
       // first page
        cy.get('.govuk-pagination__item--current > .govuk-pagination__link').click()
        cy.url().should('include', 'pageNumber=1')
        // second page
        cy.get('.govuk-pagination__list > :nth-child(2) > .govuk-pagination__link').click()
        cy.url().should('include', 'pageNumber=2')
         // next page 
        cy.get('.govuk-pagination__next > .govuk-pagination__link').click()
        cy.url().should('include', 'pageNumber=3')
        // last page 
        cy.get(':nth-child(6) > .govuk-pagination__link').click()
        cy.get('.govuk-pagination__next > .govuk-pagination__link').should('not.exist')
    })
    

})