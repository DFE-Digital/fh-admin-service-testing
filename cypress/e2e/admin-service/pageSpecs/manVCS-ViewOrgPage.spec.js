describe('|manVCS-ViewOrgPage.spec | FHG-3799 Manage VCS - View Organisations Page ',()=>{
     const num = Date.now();
    const n = num.toString();
    
    it('AC 1,5,6 - page content , back link , title ',function(){
        cy.visit('/')
        cy.welcomePage( )
         //manage VCS link
        cy.manVcsLink()
        cy.manVcsView()
         //manage VCS link
        cy.manVcsViewPage('Jubilee Church Ilford','London Borough of Redbridge')
        // back button 
        cy.get('.govuk-back-link').click()
        cy.contains('Manage organisations')
        //
         cy.manVcsView()
         cy.contains('Back to manage local authorities and organisations').click()
         cy.contains('Manage organisations')
    })

    it.only('AC 2 Add VCS Org name',()=>{
        cy.visit('/')
        cy.welcomePage( )
         //manage VCS link
        cy.manVcsLink()
        cy.get('.govuk-pagination__list > :nth-child(2) > .govuk-pagination__link').click()
        cy.get(':nth-child(5) > .govuk-pagination__link').click()
        cy.get(':nth-child(2) > .govuk-table__cell--numeric').contains('View').click()
        cy.editVcsName(n + 'Test VCS Org 001')
        cy.get('#buttonContinue').click()
        cy.get('.govuk-button').click()
    })

     it('AC 3 - view VCS Org ',function(){
        cy.visit('/')
        cy.welcomePage( )
        //manage VCS link
        cy.manVcsLink()
        // View VCS Org
        cy.manVcsView()
    })
    it('AC 4 - delete VCS Org ',function(){
        cy.visit('/')
        cy.welcomePage( )
        //manage VCS link
        cy.manVcsLink()
        // Delete VCS Org
        cy.manVcsDel()
       
    })
    it('AC 8 , sort by Organisation name',function(){
        cy.visit('/')
        cy.welcomePage( )
        //manage VCS link
        cy.manVcsLink()
        //check initial sort order on contact name
		cy.checkSortOrder(0, 'none');
		//click on Organisation name heading link
		cy.contains('Organisation').click();
		//check sort order on contact name
		cy.checkSortOrder(0, 'ascending');
		//click on Organisation name heading link
		cy.contains('Organisation').click();
		//check sort order on contact name
		cy.checkSortOrder(0, 'descending');

    })
    it('AC 9 , sort by Local authority',function(){
        cy.visit('/')
        cy.welcomePage( )
        //manage VCS link
        cy.manVcsLink()
        //check initial sort order on contact name
		cy.checkSortOrder(1, 'none');
		//click on Local authority heading link
		cy.contains('Local authority').click();
		//check sort order on contact name
		cy.checkSortOrder(1, 'ascending');
		//click on Local authority heading link
		cy.contains('Local authority').click();
		//check sort order on contact name
		cy.checkSortOrder(1, 'descending');

    })
 
    

})