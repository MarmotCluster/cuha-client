const initialState = {
  message: '',
  attempt: 0,
};

export const setToastMessage = (payload) => ({ type: 'SET_MESSAGE', payload });

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
        attempt: state.attempt + 1,
      };
    default:
      return state;
  }
}
