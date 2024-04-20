import * as CONSTANTS from '../constants/codeConstants';

const initializeState = {
 codeConfirm: ''
}
const codeReducer = (state = initializeState, action) => {
 switch (action.type) {
  case CONSTANTS.GET_CODE_CONFIRM:
   return {...state, codeConfirm: action.payload}
  default:
   return state;
 }
}

export default codeReducer;