import {
  fireEvent, render, screen, act,
} from '@testing-library/react';
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

describe(
  'App.tsx: Calculate and result test', () => {
    test(
      'Enter value and calculate', async () => {
        render(<App />);
        const yearInput = screen.getByRole(
          'button', {
            innerHTML: 'Select financial year',
          },
        );
        const incomeInput = screen.getByPlaceholderText('Enter total income');
        act(() => {
          fireEvent.click(yearInput);
          const yearInputMenuItem = screen.getByRole(
            'button', {
              innerHTML: '2022',
            },
          );
          fireEvent.click(yearInputMenuItem);
        });
        act(() => {
          fireEvent.change(
            incomeInput, {
              target: {
                value: '100000',
              },
            },
          );
        });
        act(() => {
          const submitButton = screen.getByRole(
            'button', {
              innerHTML: 'Calculate',
            },
          );
          fireEvent.click(submitButton);
        });
        // await waitFor(() => screen.getByText('Yearly Tax'));
        // const totalTaxText = screen.getByText('17,739.17');
        // const totalTaxPercentText = screen.getByText('17,74');
        //
        // expect(totalTaxText).toBeInTheDocument();
        // expect(totalTaxPercentText).toBeInTheDocument();
      },
    );
  },
);
