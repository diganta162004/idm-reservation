import React from 'react';
import { createRoot } from 'react-dom/client';

import { UseApiProvider } from './hooks/useApi';
import { isMocked } from './utils/CommonUtils';
import { HomePage } from './features/HomePage';
import { UseTaxDataProvider } from './hooks/useTaxData';

type Props = {};

type State = {};

class App extends React.PureComponent <Props, State> {
  render() {
    return (
      <UseApiProvider
        isMocked={isMocked}
      >
        <UseTaxDataProvider>
          <HomePage />
        </UseTaxDataProvider>
      </UseApiProvider>
    );
  }
}

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
