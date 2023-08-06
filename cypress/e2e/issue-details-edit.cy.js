describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  //Bonus assignment 3 Task Nr.1
  
  const expectedLength = 5;
  let priorityValues = [];
  
  describe('Priority Dropdown Test', () => {

    it.only('Should have the correct number of options in the Priority dropdown', () => {
    getIssueDetailsModal().within(() => {

      // Access the initially selected priority value and push it into the array
    cy.get('[data-testid="select:priority"]').invoke('val').then((initialValue) => {
      priorityValues.push(initialValue);
    });

    // Open the dropdown by clicking on the priority field
    cy.get('[data-testid="select:priority"]').click('bottomRight');

    // Access the list of all priority options using appropriate selector
    cy.get('[data-testid="select:priority"]').each(($option) => {
      
        // Remove leading and trailing whitespaces from the text
        const priorityOption = $option.text().trim();
        priorityValues.push(priorityOption);
        cy.log(`Added value: ${priorityOption}, Current array length: ${priorityValues.length}`);
      });
    }).then(() => {
      // Log the entire priorityValues array after collecting all the values
      cy.log('Collected priority values:', priorityValues);
    });

    // Assert that the created array has the same length as the predefined number
    cy.wrap(priorityValues).should('have.length', expectedLength);

        });
     });
  });

//Bonus Assignment 3 Task Nr. 2

  it('Reporter name Should have only characters in it.', () => {
    getIssueDetailsModal().within(() => {

const regexPattern = /^[A-Za-z\s]*$/;
    cy.get('[data-testid="select:reporter"]').invoke('text').then((reporterName) => {
      
    // Use regex to check if the reporter name contains only characters
    expect(reporterName.trim()).to.match(regexPattern)

         });
      });
});
