

describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();

      //Assert, that issue detail view modal is visible. This step can be also added to beforeEach block.
      cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    });
  });
  
 // Test 1: Create a new test case for deleting issue

  it('Should delete issue and assert, that it is not displayed on the Jira board anymore', () => {
    //Delete issue (click delete button)
    cy.get('[data-testid="icon:trash"]').click()
    //Confirm deletion
    cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click()
    //Assert, that deletion confirmation dialogue is not visible.
    cy.get('[data-testid="modal:confirm"]').should('not.exist')
    //Assert, that issue is deleted and not displayed on the Jira board anymore.
    cy.reload()
    cy.get('[data-testid="board-list:inprogress"]').contains('This is an issue of type: Task.').should('not.exist')
    //Assert than list with name Backlog is visible with only 3 tasks
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '3')
  });
});

//Test 2: Create new test case for starting the deleting issue process, but cancelling this action.

it('Should cancel deleting issue and and still be displayed on the Jira board', () => {
  //Click delete issue button
  cy.get('[data-testid="icon:trash"]').click()
  //Cancel the deletion in the confirmation pop-up.
  cy.get('[data-testid="modal:confirm"]').contains('Cancel').click()
  //Assert, that deletion confirmation dialogue is not visible.
  cy.get('[data-testid="modal:confirm"]').should('not.exist')
  //Assert, that issue modal is closed
  cy.get('[data-testid="icon:close"]').first().click()
  //Assert, that issue is not deleted and still displayed on the Jira board.
  cy.reload()
  cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    //Assert that this list contains 4 issues and first element with tag p has specified text
    cy.get('[data-testid="list-issue"]')
        .should('have.length', '4')
    });
  }); 
});
