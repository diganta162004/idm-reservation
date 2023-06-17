import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { UseApiProvider } from './hooks/useApi';
import { isMocked } from './utils/CommonUtils';
import { UseLoggerProvider } from './utils/UseLogger';
import { UseReservationProvider } from './hooks/useReservation';
import { RootNavigator } from './routes/RootNavigator';

import '../app.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type Props = {};

type State = {};

class App extends React.PureComponent <Props, State> {
  render() {
    return (
      <BrowserRouter>
        <UseLoggerProvider>
          <UseApiProvider
            isMocked={isMocked}
          >
            <UseReservationProvider>
              <RootNavigator />
            </UseReservationProvider>
          </UseApiProvider>
        </UseLoggerProvider>
      </BrowserRouter>
    );
  }
}

export default App;
//
// const root = createRoot(document.getElementById('root') as Element);
// root.render(<App />);
