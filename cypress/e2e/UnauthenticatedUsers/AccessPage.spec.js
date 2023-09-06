describe('| should redirect unauthenticated user to signin page', { tags: ['dfeAdmin'] }, () => {

    const pages = [
        "/Welcome",
        "/myaccount/viewpersonaldetails",
        "/MyAccount/ChangeName",
        "/AccountAdmin/TypeOfRole/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/TypeOfUserLa/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/WhichLocalAuthority/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/UserEmail/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/UserName/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/AddPermissionCheckAnswer/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/TypeOfUserVcs/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/WhichVcsOrganisation/b80f0812-1a99-4c4d-aaaf-110e39f9b57a",
        "/AccountAdmin/ManagePermissions",
        "/VcsAdmin/AddOrganisationWhichLocalAuthority",
        "/VcsAdmin/AddOrganisation",
        "/VcsAdmin/ManageOrganisations",
        "/OrganisationAdmin/UploadSpreadsheetData"
    ];

    pages.forEach((path) => {
        it(path, () => {
            cy.visit(path, { failOnStatusCode: false, log: false })
            cy.location("host").should("equal", "signin.integration.account.gov.uk")
        })
    })
})