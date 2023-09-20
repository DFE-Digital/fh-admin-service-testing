import { getDateString } from '../../../support/helperFunctions';

describe('| manVcs-dfeAmin-delConfirmYesPage | FHG-3807 DFE Admin - Manage VCS organisations (You have deleted the service page)', { tags: ['LAMan'] }, () => {
    var organisationName = '';
    
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('laman')

        //  Create Organisation to be deleted
        organisationName = `ZZZZZZZZZZZZZZZZZTestOrganisation-${getDateString()}`;
        cy.createVcsOrganisation(organisationName, 'LaManager')

    })

    it('AC 1,2,3 - page content , go to homepage , title ', function () {
        cy.deleteVcsOrganisation(organisationName, 'LaManager')
    })
})