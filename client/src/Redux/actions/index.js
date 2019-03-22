import { initialSettings, updateSettings, updateAmount, userSettings, updateProfile } from "../constants/action-types";

export const INITIALIZE = firstSettings => ({ type: initialSettings, payload: firstSettings })
export const UPDATE = newSettings => ({ type: updateSettings, payload: newSettings });
export const UPDATEAMOUNT = newTotal => ({ type:updateAmount, payload: newTotal});
export const LOGIN = userInfo => ({ type: userSettings, payload: userInfo});
export const UPDATEPROFILE = updatedInfo => ({ type: updateProfile, payload: updatedInfo})
