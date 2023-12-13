import { Eyes, ClassicRunner, Target } from '@applitools/eyes-webdriverio';

const eyes = new Eyes(new ClassicRunner());

fixture`ExpensesForm Regression Test`
  .page`http://161.35.188.125:3000/`; 

test('should match ExpensesForm page', async (t) => {
  try {
    // Open Applitools Eyes session
    await eyes.open(t, 'Your App', 'ExpensesForm Test');

    // Capture the entire page
    await eyes.check('ExpensesForm Page', Target.window());

    // Close the Applitools Eyes session
    await eyes.close();
  } finally {
    // If the test was aborted, don't forget to close the session
    await eyes.abortIfNotClosed();
  }
});
