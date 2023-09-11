describe('|manVCS-ViewOrgPage.spec | FHG-3799 Manage VCS - View Organisations Page ', { tags: ['LAMan'] }, () => {
    beforeEach(() => {
        cy.integrationLogin('laman')
        cy.visit('/')
    });

    const num = Date.now();
    const n = num.toString();

    it('AC 1,5,6 - page content , back link , title ', function () {
        //manage VCS link
        cy.laManVcsLink()
        cy.manVcsView()
        //manage VCS link
        cy.manVcsViewPage('Jubilee Church Ilford', 'London Borough of Redbridge')
        // back button 
        cy.get('.govuk-back-link').click()
        cy.contains('Manage organisations')
        //
        cy.manVcsView()
        cy.contains('Back to manage local authorities and organisations').click()
        cy.contains('Manage organisations')
    })

    it('AC 2 Add VCS Org name', () => {
        //manage VCS link
        cy.laManVcsLink()
        cy.get('.govuk-pagination__list > :nth-child(2) > .govuk-pagination__link').click()
        cy.get(':nth-child(5) > .govuk-pagination__link').click()
        cy.get(':nth-child(1) > .govuk-table__cell--numeric').contains('View').click()
        cy.editVcsName(n + 'Test VCS Org 001')
        cy.get('#buttonContinue').click()
        cy.get('.govuk-button').contains('Save').click();
    })

    it('AC 3 - view VCS Org ', function () {
        //manage VCS link
        cy.laManVcsLink()
        // View VCS Org
        cy.manVcsView()
    })

    it('AC 4 - delete VCS Org ', function () {
        //manage VCS link
        cy.laManVcsLink()
        // Delete VCS Org
        cy.manVcsDel()
    })

    it('AC 8 , sort by Organisation name', function () {
        //manage VCS link
        cy.laManVcsLink()
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

    it('AC 9 , sort by Local authority', function () {
        //manage VCS link
        cy.laManVcsLink()
        //check initial sort order on contact name
        cy.checkSortOrder(0, 'none');
        //click on Local authority heading link
        cy.contains('Organisation').click();
        //check sort order on contact name
        cy.checkSortOrder(0, 'ascending');
        //click on Local authority heading link
        cy.contains('Organisation').click();
        //check sort order on contact name
        cy.checkSortOrder(0, 'descending');
    })
})