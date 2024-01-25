describe('| manPerm-managePermissionsPage.spec | FHG-1617 Manage permissions ( Manage User Permissions) Page ', { tags: ['LAMan'] }, () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')
    });

    it('Validate permissions page', function () {
        cy.gotoManagePermissionsPage()
        cy.managePermissionsPage()
    })

    it('AC 1 , 4 - page content , back link ', function () {
        //manage permissions link 
        cy.gotoManagePermissionsPage()
        // back link
        cy.get('.govuk-back-link').click()
        cy.LAManWelcomePage('Tower Hamlets Council')
    })

    it('AC 2 - edit permissions link ', function () {
        //manage permissions link
        cy.gotoManagePermissionsPage()
        // delete permissions link
        cy.editPermissionsLink()
    })
    it('AC 3 - delete permissions link ', function () {
        //manage permissions link
        cy.gotoManagePermissionsPage()
        // delete permissions link
        cy.deletePermissionsLink()

    })
    it('AC 5 - Type of user filters - Both LA and VCS ', () => {
        //manage permissions link
        cy.gotoManagePermissionsPage()

        cy.clearFilters()
        // apply LA filter 
        cy.typeOfUserFilter('la')
        cy.contains('Tower Hamlets')
        cy.clearFilters()
        // apply VCS filter
        cy.typeOfUserFilter('vcs')
        cy.contains('Bangladeshi')
        cy.clearFilters()
        //apply both filters 
        cy.typeOfUserFilter('both')
        // add validations
        // first page has VCS 
        cy.contains('Bangladeshi')
        // last page has LA 
        cy.get(':nth-child(4) > .govuk-pagination__link').click()
        cy.contains('Elop')
    })

    it('AC 6 - Name , Email , Organisation filter', () => {
        var n = Date.now().toString();
        var email = n + 'abc@co.uk';
        var name = n + 'John Smith';
        cy.LaCreateVcsUser(email, name);
        
        //manage permissions link
        cy.gotoManagePermissionsPage()

        cy.clearFilters()
        // name filter 
        cy.nameFilter(name)
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains(name)
        cy.clearFilters()
        // email filter 
        cy.emailFilter(email)
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains(email)
        cy.clearFilters()
        // organisation filter
        cy.organisationFilter('Tower Hamlets Council')
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Tower Hamlets Council')
        cy.clearFilters()
    })
    it('AC 8 , 9 - no result found  + Clear filter', () => {
        //manage permissions link
        cy.gotoManagePermissionsPage()
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

    it('AC 11 , 12 Pagination', () => {
        //manage permissions link
        cy.gotoManagePermissionsPage()
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

    it(' Name - sort by Organisation name', function () {
        //manage permissions link
        cy.gotoManagePermissionsPage()
        //check initial sort order on contact name
        cy.checkSortOrder(0, 'none');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Name').click();
        //check sort order on contact name
        cy.checkSortOrder(0, 'ascending');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Name').click();
        //check sort order on contact name
        cy.checkSortOrder(0, 'descending');

    })

    it('Email address , sort by Email address', function () {
        //manage permissions link
        cy.gotoManagePermissionsPage()
        //check initial sort order on contact name
        cy.checkSortOrder(1, 'none');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Email address').click();
        //check sort order on contact name
        cy.checkSortOrder(1, 'ascending');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Email address').click();
        //check sort order on contact name
        cy.checkSortOrder(1, 'descending');
    })

    it('Works for , sort by Works for', function () {
        //manage permissions link
        cy.gotoManagePermissionsPage()
        //check initial sort order on contact name
        cy.checkSortOrder(2, 'none');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Works for').click();
        //check sort order on contact name
        cy.checkSortOrder(2, 'ascending');
        //click on Organisation name heading link
        cy.get('form > .govuk-grid-row > .govuk-grid-column-two-thirds').contains('Works for').click();
        //check sort order on contact name
        cy.checkSortOrder(2, 'descending');
    })
})