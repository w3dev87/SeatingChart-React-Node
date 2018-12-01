import React from 'react';
import { Grid, Cell } from 'react-flexr';
import Menu from './Menu';

export default () => {
  return (
    <Grid>
      <Cell size='4/12'>
        <Menu />
      </Cell>
    </Grid>
  );
}
