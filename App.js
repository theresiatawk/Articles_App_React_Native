import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import articlesReducer from './store/reducers/articles';

export default function App() {

  const rootReducer = combineReducers({users: authReducer, articles: articlesReducer});
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store = {store}>
      <AppNavigator />
    </Provider>
  );
}
