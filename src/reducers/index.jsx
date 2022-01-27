import { combineReducers } from 'redux';

import settingsReducer from './settingsReducer';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
    seto: settingsReducer,
    accounts: accountReducer,
});

export default rootReducer;
