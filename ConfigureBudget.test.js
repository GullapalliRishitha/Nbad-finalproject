import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import ConfigureBudget from './ConfigureBudget';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ /* your mock response data here */ }),
  })
);

describe('ConfigureBudget component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<ConfigureBudget userData={{}} />);
    expect(getByText('Add new Expense')).toBeInTheDocument();
  });

  test('submits the form correctly', async () => {
    const userData = {
      user: 'testUser',
      token: 'testToken',
    };

    const { getByText, getByLabelText } = render(<ConfigureBudget userData={userData} />);

    // Fill out the form
    fireEvent.change(getByLabelText('Expense'), { target: { value: 'Test Expense' } });
    fireEvent.change(getByLabelText('Budget'), { target: { value: '100' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Wait for the asynchronous fetch to complete
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Optionally, assert on the content or behavior after a successful submit
    // Example: expect(getByText('Expense created successfully')).toBeInTheDocument();
  });

  // Add more tests as needed for error cases, edge cases, etc.
});
