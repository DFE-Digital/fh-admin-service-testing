describe('|manVCS-manOrgsPage.spec | FHG-3798 Manage VCS Organisations Page ',{tags: ['dfeAdmin']},()=>{
    
    it('AC 1,5,7 - page content , back link , title ',function(){
        cy.visit('/')
        cy.dfeAdminWelcomePage()
         //manage VCS link
        cy.manVcsLink()
        // back link
        cy.get('.govuk-back-link').click()
        cy.dfeAdminWelcomePage()
       
    })

    it('AC 2 pagination',()=>{
        cy.visit('/')
        cy.dfeAdminWelcomePage()
         //manage VCS link
        cy.manVcsLink()
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

     it('AC 3 - view VCS Org ',function(){
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        //manage VCS link
        cy.manVcsLink()
        // View VCS Org
        cy.manVcsView()
    })
    it('AC 4 - delete VCS Org ',function(){
        cy.visit('/')
        cy.dfeAdminWelcomePage()
        //manage VCS link
        cy.manVcsLink()
        // Delete VCS Org
        cy.manVcsDel()
       
    })
    it('AC 8 , sort by Organisation name',function(){
        cy.visit('/')
        cy.dfeAdminWelcomePage()
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
        cy.dfeAdminWelcomePage()
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