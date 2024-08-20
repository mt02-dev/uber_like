import { REQUEST_STATE } from "../constants";

export const  initialState  = {
  fetchState: REQUEST_STATE.INITIAL, // 取得状況
  postState: REQUEST_STATE.INITIAL,  // 登録状況
  lineFoodsSummary: null
}

export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const lineFoodReducer = (state: string, action: any) => {
  switch(action.type)
}