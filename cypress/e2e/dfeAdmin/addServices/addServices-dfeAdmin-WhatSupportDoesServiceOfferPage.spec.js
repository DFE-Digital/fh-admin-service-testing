describe('DfE Admin - Add services - what support does service offer page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.integrationLogin('dfeadmin')
        cy.contains('Add a service').click();
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //enter a service name
        cy.enterTextAndContinue('.govuk-input', 'test service', 'div.govuk-grid-row button');
    })

    it('validate support selection page content and back link', () => {
        const expectedPageHeading = "What support does the service offer?";
        let actualText = [];
        const expectedText = ['Select the categories and subcategories of support that test service provides.'];
        const expectedServiceNameHeading = 'What is the service name?';

        //check page heading
        cy.checkPageHeading("h1", expectedPageHeading);
        //check text box content
        cy.getTextOfElements('form > p', actualText, expectedText);
        //Click on back link
        cy.clickBackLink();
        //verify page heading
        cy.checkPageHeading('h1', expectedServiceNameHeading);
    })

    it('validate categories listed on the page', () => {
        let actualText = [];
        const expectedText = ['Activities, clubs and groups', 'Family support', 'Health', 'Pregnancy, birth and early years', 'Special educational needs and disabilities (SEND)', 'Transport'];

        //check text box content
        cy.getvisibleTextOfElements(".govuk-checkboxes__label", actualText, expectedText);
    })

    it('validate sub-categories for Activities category', () => {
        let actualText = [];
        const expectedText = ['Activities', 'Before and after school clubs', 'Holiday clubs and schemes', 'Music, arts and dance', 'Parent, baby and toddler groups', 'Pre-school playgroup', 'Sports and recreation'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Activities, clubs and groups');
        //check sub-category heading
        cy.checkPageHeading('#group-1 > .govuk-form-group > .govuk-label--s', 'Select activities, clubs and groups');
        //check text box content
        cy.getTextOfSubCategories("#group-1", actualText, expectedText);
    })

    it('validate sub-categories for Family support category', () => {
        let actualText = [];
        const expectedText = ['Bullying and cyber bullying', 'Debt and welfare advice', 'Domestic abuse', 'Intensive targeted family support', 'Money, benefits and housing', 'Parenting support', 'Reducing parental conflict',
        'Separating and separated parent support', 'Stopping smoking', 'Substance misuse (including alcohol and drug)', 'Targeted youth support', 'Youth justice services'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Family support');
        //check sub-category heading
        cy.checkPageHeading('#group-2 > .govuk-form-group > .govuk-label--s', 'Select family support');
        //check text box content
        cy.getTextOfSubCategories("#group-2", actualText, expectedText);
    })

    it('validate sub-categories for Health category', () => {
        let actualText = [];
        const expectedText = ['Hearing and sight', 'Mental health, social and emotional support', 'Nutrition and weight management', 'Oral health', 'Public health services'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Health');
        //check sub-category heading
        cy.checkPageHeading('#group-3 > .govuk-form-group > .govuk-label--s', 'Select health');
        //check text box content
        cy.getTextOfSubCategories("#group-3", actualText, expectedText);
    })

    it('validate sub-categories for Pregnancy, birth and early years category', () => {
        let actualText = [];
        const expectedText = ['Birth registration', 'Early years language and learning', 'Health visiting', 'Infant feeding support (including breastfeeding)', 'Midwife and maternity', 'Perinatal mental health support (pregnancy to one year post birth)'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Pregnancy, birth and early years');
        //check sub-category heading
        cy.checkPageHeading('#group-4 > .govuk-form-group > .govuk-label--s', 'Select pregnancy, birth and early years');
        //check text box content
        cy.getTextOfSubCategories("#group-4", actualText, expectedText);
    })

    it('validate sub-categories for Special educational needs and disabilities (SEND) category', () => {
        let actualText = [];
        const expectedText = ['Autistic Spectrum Disorder (ASD)', 'Breaks and respite', 'Early years support', 'Groups for parents and carers of children with SEND', 'Hearing impairment', 'Learning difficulties and disabilities',
            'Multi-sensory impairment', 'Other difficulties or disabilities', 'Physical disabilities', 'Social, emotional and mental health support', 'Speech, language and communication needs', 'Visual impairment'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Special educational needs and disabilities (SEND)');
        //check sub-category heading
        cy.checkPageHeading('#group-5 > .govuk-form-group > .govuk-label--s', 'Select special educational needs and disabilities (SEND)');
        //check text box content
        cy.getTextOfSubCategories("#group-5", actualText, expectedText);
    })

    it('validate sub-categories for Transport category', () => {
        let actualText = [];
        const expectedText = ['Community transport'];

        //select activities, clubs and groups checkbox
        cy.selectCheckBoxes('Transport');
        //check sub-category heading
        cy.checkPageHeading('#group-6 > .govuk-form-group > .govuk-label--s', 'Select transport');
        //check text box content
        cy.getTextOfSubCategories("#group-6", actualText, expectedText);
    })

    it('Select sub-categories from each category and click on continue button', () => {
        const checkboxList = ['Activities, clubs and groups', 'Holiday clubs and schemes', 'Family support', 'Parenting support', 'Health', 'Public health services',
            'Pregnancy, birth and early years', 'Health visiting', 'Special educational needs and disabilities (SEND)', 'Early years support', 'Transport', 'Community transport'];
        let actualList = [];

        //select checkboxes
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check page heading
        cy.checkPageHeading("h1", "Give a description of the service");
        //click on back link
        cy.clickBackLink();
        //check pre selected checkboxes
        cy.getTextOfCheckedCheckboxes(actualList, checkboxList);
    })    

    it('Check error message when no category is selected', () => {
        const errorHeading = 'There is a problem';
        const errorMessages = ['Select the type of support the service offers'];
        let [actualBannerMessages, actualMessages] = [[], []];

        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })

    it('Check error message when no sub-category is selected', () => {
        const checkboxList = ['Activities, clubs and groups', 'Family support', 'Health', 'Pregnancy, birth and early years', 'Special educational needs and disabilities (SEND)', 'Transport'];
        const errorHeading = 'There is a problem';
        const errorMessages = ['Select name of sub-category support'];
        let [actualBannerMessages, actualMessages] = [[], []];

        //select checkboxes
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })

    it('Check error message when a sub-category is selected from a category and no sub-category selected from a second category', () => {
        const checkboxList = ['Activities, clubs and groups', 'Music, arts and dance', 'Pregnancy, birth and early years', 'Transport'];
        const errorHeading = 'There is a problem';
        const errorMessages = ['Select name of sub-category support'];
        let [actualBannerMessages, actualMessages] = [[], []];

        //select checkboxes
        checkboxList.forEach((checkbox) => {
            cy.selectCheckBoxes(checkbox);
        })
        //click on continue button
        cy.get('div.govuk-grid-row button').click();
        //check error message
        cy.checkErrorBannerAndMessages(errorHeading, errorMessages, actualBannerMessages, actualMessages);
    })
})