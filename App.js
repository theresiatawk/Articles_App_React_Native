import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';

export default function App() {

  const rootReducer = combineReducers({users: authReducer});
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store = {store}>
      <AppNavigator />
    </Provider>
  );
}
