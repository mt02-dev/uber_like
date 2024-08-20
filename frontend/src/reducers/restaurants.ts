import { REQUEST_STATE, RequestState } from "../constants";
import { Restaurant } from "../types/restaurants/restaurants";
import { restaurantsIndex } from "../urls";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: []
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
};

export type RestaurantsActionTypes = {
  fetchstate: typeof REQUEST_STATE[keyof typeof REQUEST_STATE],
  restaurantsList: Restaurant[]
}

export const restaurantsReducer = (state: any, action: any) => {
  switch(action.type){
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
      default:
        throw new Error();
  }
}