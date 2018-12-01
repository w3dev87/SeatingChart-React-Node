import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import App from './App';
import PanelContainer from './containers/PanelContainer';
import MainPage from './components/MainPage';
import * as panelTypes from './constants/panelTypes';

export default (
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <Route path='admin-panel' component={ PanelContainer } panelType={ panelTypes.ADMIN_PANEL } />
      <Route path='wedding-panel' component={ PanelContainer } panelType={ panelTypes.WEDDING_PANEL } />
      <Route path='booking-panel' component={ PanelContainer } panelType={ panelTypes.BOOKING_PANEL } />
      <Route path='*' component={ MainPage } />
      <IndexRoute component={ MainPage } />
    </Route>
  </Router>
);
