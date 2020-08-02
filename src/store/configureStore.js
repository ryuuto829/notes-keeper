import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import createSagaMiddleware from 'redux-saga';
import { watchAuthSaga } from './sagas';
import { loadFromLocalStorage } from '../utils/localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const userData = loadFromLocalStorage('user');
const persistedUserData = {
  auth: {
    isAuthenticated: userData !== undefined && userData !== null,
    isFetching: false,
    errorMessages: {}
  },
  user: userData || null
};

/** To enable sagas return store instead of function creator */
const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedUserData,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    ));

  /** Run all sagas */
  sagaMiddleware.run(watchAuthSaga);
  return store;
};

export default configureStore;
