import * as CONSTANTS from '../constants/codeConstants';

export const getCodeConfirm = code => {
 return {
  type: CONSTANTS.GET_CODE_CONFIRM,
  payload: code
 }
}
