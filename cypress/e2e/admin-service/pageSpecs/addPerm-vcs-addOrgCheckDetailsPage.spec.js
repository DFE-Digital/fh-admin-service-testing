describe('| addPerm-vcs-addOrgCheckDetailsPage | FGH-3445 VCS Add Org Check details page',()=>{
    const num = Date.now();
    const n = num.toString();
    // As a DFE Admin  creating an VCS account
    beforeEach(()=> {
		cy.visit('/')
        cy.startPage()
        cy.stubLogin('dfeAdmin')
        cy.welcomePage('Dfe Admin User')
        cy.addPermissions()
        cy.typeOfUserPage('vcs')
        cy.typeOfUserVCS('both')
        cy.vcsWhichLA('redbridge')
    })

    it('AC 1,4 - Validate page content , back link',()=>{
         cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + '+VCS Organisation name')
        cy.contains(n + '+VCS Organisation name')
        // back link
        cy.get('.govuk-back-link').click()
        cy.addOrgVcs(n + '  VCS Organisation name')
        // continue
        cy.checkDetailsPage()
    })
    it('AC 2 - Continue to next page',()=>{
        cy.contains('Which organisation do they work for?')
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + ' -VCS Organisation name')
        cy.contains(n + ' -VCS Organisation name')
        // // continue
        // cy.checkDetailsPage()
        cy.get('.govuk-button').click()
        // VCS added 
        cy.contains('Voluntary community organisation added')
    })
    it('AC 3 - Change option',()=>{
        // add org link
        cy.addOrgLink()
        // add organisation name page
        cy.addOrgVcs(n + ' VCS Organisation name')
        cy.get('.govuk-link').click()
        // add organisation name page
        cy.addOrgVcs(n + 'New VCS Organisation name')


    })


})