import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

describe(
  'App.tsx: First Render tests', () => {
    test(
      'check all element is present', () => {
        render(<App />);
        const headingElement = screen.getByText('Calculate your tax');
        const yearInput = screen.getByRole(
          'button', {
            innerHTML: 'Select financial year',
          },
        );
        const submitButton = screen.getByRole(
          'button', {
            innerHTML: 'Calculate',
          },
        );
        const incomeInput = screen.getByPlaceholderText('Enter total income');
        const defaultText = screen.getByText('Please choose the fiscal year and input your yearly income to determine the corresponding tax amount.');
        expect(headingElement).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
        expect(incomeInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(defaultText).toBeInTheDocument();
      },
    );
  },
);
