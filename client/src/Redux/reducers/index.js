import { updateSettings, initialSettings, updateAmount, userSettings, updateProfile } from "../constants/action-types";



const initialState = {
  currencies: {},
  settings: {},
  user: {loggedIn: false, },

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case initialSettings:
      return {...action.payload}
    case updateSettings:
      return {...state,  settings: {...state.settings, ...action.payload}}
    case updateAmount:
      return {...state, currencies:{...state.currencies, ...action.payload}}
    case userSettings:
      return {...state, user:{...state.user, ...action.payload}}
    case updateProfile:
      return {...state, user:{...state.user, ...action.payload}}
    default:
      return state;
  }
};
export default rootReducer;