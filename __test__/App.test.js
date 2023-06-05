import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

describe(
  'App.tsx: First Render tests', () => {
    test(
      'if the heading is correct', () => {
        render(<App />);
        const headingElement = screen.getByText('Calculate your tax');
        expect(headingElement).toBeInTheDocument();
      },
    );
  },
);
