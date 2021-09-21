import addListeners from '../src/utils/addListeners.js';
import { render } from '../src/utils/render.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';
import reducer from './reducers.js';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

/* eslint no-undef: 0 */
const store = Redux.createStore(
  reducer,
  persistedState,
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk.default),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
  render(state);
  addListeners();
  setCurrentPatient();
});

export default store;
