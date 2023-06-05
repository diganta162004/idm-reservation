import React from 'react';

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

export default App;
//
// const root = createRoot(document.getElementById('root') as Element);
// root.render(<App />);
