import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './state';
import App from './components/app';

const store = createStore(
	rootReducer,
	applyMiddleware( thunkMiddleware )
);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById( 'app' )
);
