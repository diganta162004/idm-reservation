import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './Routes';
import { SearchPage } from '../features/search/SearchPage';

import './root-navigator.scss';

const styles = {
  container: 'idr__root-navigator__container',
};

const RootNavigator = () => (
  <Container
    maxWidth="md"
    className={styles.container}
  >
    <Routes>
      <Route
        id={ROUTES.SEARCH_PAGE.id}
        path={ROUTES.SEARCH_PAGE.path}
        element={<SearchPage />}
      />
    </Routes>
  </Container>
);
export { RootNavigator };
