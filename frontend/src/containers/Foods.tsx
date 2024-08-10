import React, { Fragment, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import { Food } from "../types/foods/foods";
import { 
  initialState,
  foodsActionType,
  foodsReducer
 } from "../reducers/foods";
 import { REQUEST_STATE } from "../constants";

const Foods = ()  => {
  const { restaurantsId = ''} = useParams<{restaurantsId? : string}>();
  // console.log(restaurantsId);
  const [ state, dispatch ] = useReducer(foodsReducer, initialState);
  useEffect(() => {
    dispatch({type: foodsActionType.FETCHING});
    fetchFoods(restaurantsId)
    .then((data) => {
      dispatch({ 
        type: foodsActionType.FETCH_SUCCESS,
        payload: {
          foods: data.foods
        }
      });
      // console.log(state.foodList);


    })
  }, []);
  
  return (
    <Fragment>
      {
        state.fetchState === REQUEST_STATE.LOADING ?
          <p>Now Loading...</p>
        :
        
        state.foodList.map((food: any) => {
          return (
            <div key={food.id}>
              {food.name}
            </div>
          )
        })
      }
    </Fragment>
  )
}

export default Foods;