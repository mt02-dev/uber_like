import { act } from "react";
import { REQUEST_STATE } from "../constants";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodList: [],
}

export const foodsActionType = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SCCESS' 
}

export const foodsReducer = (state: any, action: any) => {
  switch(action.type) {
    case foodsActionType.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case foodsActionType.FETCH_SUCCESS:
      console.log(action.payload);
      return {
        fetchState: REQUEST_STATE.OK,
        foodList: action.payload.foods
      };
    default:
      throw new Error();
  }
}