describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');

//creating new issue
cy.get(IssueCreate).within(() => {
  cy.get('.ql-editor').type(Mydescription);
  cy.get('input[name="title"]').type(title);
  cy.get('button[type="submit"]').click();
});
cy.get(IssueCreate).should('not.exist');
cy.contains('Issue has been successfully created.').should('be.visible');
cy.reload();

//assert that new issue is visible in the list
cy.contains('Issue has been successfully created.').should('not.exist');
cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains(title);
         });
      });
    });

    
    const title = 'BUG_TITLE'
    const Mydescription = 'My bug description'
    const IssueCreate = '[data-testid="modal:issue-create"]'
    const iconClose = 'button i[data-testid="icon:close"]'
    const MyNumber = 'input[placeholder="Number"]'
    
it('Should create an issue and add estimation, change and delete', () => {
    
    //Add estimation
    cy.contains(title).click()
    cy.get('input[placeholder="Number"]').type('10');
    cy.contains('10h estimated').should('be.visible')
    cy.get(iconClose).click();
    cy.contains(title).click()
    cy.get(MyNumber).should('be.visible', '10');
    cy.get(iconClose).click();

    //Change estimation
    cy.contains(title).click()
    cy.get(MyNumber).clear().type('15');
    cy.contains('15h estimated').should('be.visible')
    cy.get(iconClose).click();
    cy.contains(title).click()
    cy.get(MyNumber).should('be.visible', '15');
    cy.get(iconClose).click();
    
    //Dekete estimation
    cy.contains(title).click()
    cy.get(MyNumber).clear()
    cy.get(MyNumber).should('be.visible', '' )
    cy.get(iconClose).click();
});

it('Should create an issue and add estimation, change and delete', () => {

  const StopWatch = '[data-testid="icon:stopwatch"]'
  const Tracking = '[data-testid="modal:tracking"]'

  //Logs spent time to recently created issue
  cy.get('[data-testid="list-issue"]');
  cy.contains(title).click();
  cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get(StopWatch).click();
    cy.get(Tracking).first().should('be.visible');
    cy.get(MyNumber).eq(1).type('2');
    cy.get(MyNumber).eq(1).should('have.value', '2').should('be.visible');
    cy.get(MyNumber).eq(2).type('5');
    cy.get(MyNumber).eq(2).should('have.value', '5').should('be.visible');

    cy.get(Tracking).contains('Done').click()

  //Removes logged spent time from recently created issue
  
  cy.get(StopWatch).click();
  cy.get(Tracking).first().should('be.visible');
    cy.get(MyNumber).eq(1).clear();
    cy.get(MyNumber).eq(1).should('be.visible');
    cy.get(MyNumber).eq(2).clear();
    cy.get(MyNumber).eq(2).should('be.visible');

    cy.get(Tracking).contains('Done').click()


  });
});
  
    
       
   