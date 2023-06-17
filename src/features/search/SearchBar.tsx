import React, { useCallback, useState } from 'react';
import {
  TextField, Grid, Button,
} from '@mui/material';

import { SEARCH_BAR_STATICS } from './SearchStatics';
import { InputValueType } from '../../types/CommonTypes';

import './search-bar.scss';

type Props = {
    onSearchClick?: (email: string) => void,
}

const styles = {
  container: 'idr__search-bar__container',
};

const SearchBar = (props: Props) => {
  const { onSearchClick } = props;

  const [searchEmail, setSearchEmail] = useState<InputValueType>({
    isTouched: false,
    value: '',
    error: '',
  });

  const onSearchEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchEmail((prevState) => ({
        ...prevState,
        value: e.target.value,
      }));
    }, [],
  );

  const onSearchClickLocal = useCallback(
    () => {
      onSearchClick?.(searchEmail.value);
    }, [onSearchClick],
  );

  return (
    <Grid
      container
      spacing={2}
      className={styles.container}
      margin={0}
    >
      <Grid xs={6}>
        <TextField
          id={SEARCH_BAR_STATICS.searchField.id}
          label={SEARCH_BAR_STATICS.searchField.label}
          variant="standard"
          value={searchEmail.value}
          error={searchEmail.isTouched}
          helperText={searchEmail.isTouched ? searchEmail.error : ''}
          onChange={onSearchEmailChange}
        />
      </Grid>

      <Grid xs={2}>
        <Button
          variant="outlined"
          onClick={onSearchClickLocal}
        >
          {SEARCH_BAR_STATICS.searchButton.label}
        </Button>
      </Grid>
    </Grid>
  );
};

SearchBar.defaultProps = {
  onSearchClick: () => {},
};

export { SearchBar };
