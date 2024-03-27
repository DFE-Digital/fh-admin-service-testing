import { getDateString } from '../../../support/helperFunctions';

describe("| addPerm-vcs-checkAnswerPage | FHG-3418 DFE - add permissions - check account details page", { tags: ['dfeAdmin'] }, () => {
  // As a DFE Admin  creating an VCS account
  var n;
  var emailAddress;
  
  beforeEach(() => {
    n = getDateString();
    emailAddress = n + 'abcdef@def.com';
    cy.visit('/')
    cy.integrationLogin('dfeadmin')    
    cy.gotoAddPermissionsPage()
    cy.typeOfUserPage('vcs')
    cy.typeOfUserVCS('1')
    cy.selectWhichLA('tower hamlets', 'ForUserTypeVcs')
    cy.whichOrgVcs('elop')
    cy.email(emailAddress)
    cy.fullName(n + 'John Paul Smith')

  })

  it('AC 1,4 - validate page content , back link ', () => {

    const fullName = n + 'John Smith';

    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services',
      'Local authority': 'Tower Hamlets Council',
      'Voluntary and community organisation': 'Elop Mentoring',
      'Email address': emailAddress,
      'Name': n + 'John Paul Smith',
    };

    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

    // back button - takes user to user name page
    cy.get('.govuk-back-link').click()
    cy.fullName(fullName)

    //next page 
    cy.checkAnswerPage()
    cy.contains('Permissions added')

    // Clean Up
    cy.deleteUser(emailAddress, fullName)
  })

  it('AC 3 - Change link - who for', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services, View and respond to connection requests',
      'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
      'Email address': emailAddress,
      'Name': n + 'John Steven Smith',
    };
    cy.get('#linkWhoFor').click()
    cy.typeOfUserPage('vcs')
    cy.typeOfUserVCS('both')
    cy.selectWhichLA('bristol', 'ForUserTypeVcs')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(emailAddress)
    cy.fullName(n + 'John Steven Smith')

    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

  })

  it('AC 3 - Change link - Type of permission', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services, View and respond to connection requests',
      'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
      'Email address': emailAddress,
      'Name': n + 'John Steven Smith',
    };
    cy.get('#linkTypeOfPermission').click()
    cy.typeOfUserVCS('both')
    cy.selectWhichLA('bristol', 'ForUserTypeVcs')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(emailAddress)
    cy.fullName(n + 'John Steven Smith')
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)


  })

  it('AC 3 - Change link - Local authority', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services',
      'Local authority': 'Bristol County Council',
      'Voluntary and community organisation': 'Hartcliffe Club for Young People',
      'Email address': emailAddress,
      'Name': n + 'John Steven Smith',
    };
    cy.get('#linkLocalAuthority').click()
    cy.selectWhichLA('bristol', 'ForUserTypeVcs')
    cy.whichOrgVcs('Hartcliffe Club for Young People')
    cy.email(emailAddress)
    cy.fullName(n + 'John Steven Smith')
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)


  })

  it('AC 3 - Change link - Which VCS Organisation', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services',
      'Local authority': 'Tower Hamlets Council',
      'Voluntary and community organisation': 'Whizz-Kidz Wheelchair Skills Holiday Clubs',
      'Email address': emailAddress,
      'Name': n + 'John Steven Smith',
    };
    cy.get('#linkVcsOrganisation').click()
    cy.whichOrgVcs('Whizz-Kidz')
    cy.email(emailAddress)
    cy.fullName(n + 'John Steven Smith')
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

  })

  it('AC 3 - Change link - Email address', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services',
      'Local authority': 'Tower Hamlets Council',
      'Voluntary and community organisation': 'Elop Mentoring',
      'Email address': n + 'new.email@def.com',
      'Name': n + 'John Steven Smith',
    };
    cy.get('#linkEmailAddress').click()
    cy.email(n + 'new.email@def.com')
    cy.fullName(n + 'John Steven Smith')
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)

  })

  it('AC 3 - Change link - Name', () => {
    const expectedContent = {
      'Who for': 'Someone who works for a voluntary and community sector organisation',
      'Type of permission': 'Add and manage services',
      'Local authority': 'Tower Hamlets Council',
      'Voluntary and community organisation': 'Elop Mentoring',
      'Email address': emailAddress,
      'Name': n + 'John Paul Smith Jr',
    };

    cy.get('#linkFullName').click()
    cy.fullName(n + 'John Paul Smith Jr')
    // validate response
    cy.contains('Check account details')
    cy.checkAnswerDetails(expectedContent)
  })
})