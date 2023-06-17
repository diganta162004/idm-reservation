import React from 'react';
import { Button } from '@mui/material';

import { UseApiProvider } from './hooks/useApi';
import { isMocked } from './utils/CommonUtils';
import { UseLoggerProvider } from './utils/UseLogger';

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
      <UseLoggerProvider>
        <UseApiProvider
          isMocked={isMocked}
        >
          <Button variant="contained">Hello World</Button>
        </UseApiProvider>
      </UseLoggerProvider>
    );
  }
}

export default App;
//
// const root = createRoot(document.getElementById('root') as Element);
// root.render(<App />);
