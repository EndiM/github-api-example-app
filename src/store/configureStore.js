import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';

export default function configureStore(initialState) {
	const logger = store => next => action => {// eslint-disable-line no-unused-vars
		return next(action);
	};

	const middleware = applyMiddleware(logger);

	const store = createStore(initialState, middleware);
	return store;
}

