describe('e2e test and visual regression', () => {

    // E2E Test
    it('passes', () => {
      cy.visit('http://161.35.188.125:3000/')
      cy.url().should('eq', 'http://161.35.188.125:3000/signin');
  
      cy.get('input[type="email"]').type('testuser@example.com');
      cy.get('input[type="password"]').type('testpassword');
  
      // Click the sign-in button
      cy.get('button[type="submit"]').click();
  
      // Assert that the user is redirected to the home page or another expected page
      cy.url().should('eq', 'http://161.35.188.125:3000/');
    })
  
    // Visual Regression Test using Applitools and Cypress
    it('should look the same', () =>{
      cy.eyesOpen({
        appName: 'Budget App',
        testName: 'Homepage Visual Check'
      });
      cy.eyesCheckWindow();
      cy.eyesClose();
    })
})
