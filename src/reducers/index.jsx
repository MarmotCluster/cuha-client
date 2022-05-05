import { combineReducers } from 'redux';

import settingsReducer from './settingsReducer';
import accountReducer from './accountReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  seto: settingsReducer,
  accounts: accountReducer,
  notifications: notificationReducer,
});

export default rootReducer;
