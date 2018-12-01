import React from 'react'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes';
import reducers from './reducers';

const store = createStore(reducers, compose(
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default () => {
  return (
	<Provider store={store}>
    	<MuiThemeProvider>
    		<Routes />
    	</MuiThemeProvider>
    </Provider>
  )
}
