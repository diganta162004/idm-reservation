import React from 'react';
import { createRoot } from 'react-dom/client';

import { UseApiProvider } from './hooks/useApi';
import { isMocked } from './utils/CommonUtils';
import { HomePage } from './features/homepage/HomePage';
import { UseTaxDataProvider } from './hooks/useTaxData';
import { UseLoggerProvider } from './utils/UseLogger';

import '../app.scss';

type Props = {};

type State = {};

class App extends React.PureComponent <Props, State> {
  render() {
    return (
      <UseLoggerProvider>
        <UseApiProvider
          isMocked={isMocked}
        >
          <UseTaxDataProvider>
            <HomePage />
          </UseTaxDataProvider>
        </UseApiProvider>
      </UseLoggerProvider>
    );
  }
}

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
