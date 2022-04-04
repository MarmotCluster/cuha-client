import { getCookie, setCookie } from '../components/cookies';

export const finalSet = (payload) => ({ type: 'settings/THEME', payload });

// console.log(getCookie('settings'));

const initialState =
    getCookie('settings') === undefined
        ? {
              theme: 0,
              language: 1,
          }
        : getCookie('settings');

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'settings/THEME':
            setCookie('settings', action.payload, {});
            return action.payload;
        default:
            return state;
    }
}
