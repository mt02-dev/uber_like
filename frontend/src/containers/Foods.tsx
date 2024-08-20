import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import { Food } from "../types/foods/foods";
import { colors, Skeleton } from "@mui/material";
import MainLogo from '../images/logo.png';
import FoodImage  from "../images/food-image.jpg";
import {
  initialState as foodInitialState,
  foodsActionType,
  foodsReducer
 } from "../reducers/foods";
import { REQUEST_STATE } from "../constants";
import { COLORS } from "../style_constants";
import { LocalMallIcon } from "../components/Icons";
import { FoodWrapper } from "../components/FoodWrapper";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";
import { HTTP_STATUS_CODE } from "../constants";


type State = {
  isOpenOrderDialog: boolean;
  selectedFood?: null | Food;
  selectedFoodCount: number;
  isOpenNewOrderDialog: boolean;
  existingRestaurautName: string;
  newRestaurautName: string;

}

const Foods = ()  => {
  const { restaurantsId = ''} = useParams<{restaurantsId? : string}>();
  const [ foodState, dispatch ] = useReducer(foodsReducer, foodInitialState);
  const navigate = useNavigate();
  const initialState = {
     isOpenOrderDialog: false,
     selectedFood: null,
     selectedFoodCount: 1,
     isOpenNewOrderDialog: false,
     existingRestaurautName: '',
     newRestaurautName: '',
  }
  const [ state, setState ] = useState<State>(initialState);

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
    })
  }, []);

  const submitOrder = () => {
    if(!state.selectedFood) return;
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount
    }).then(() => navigate('/orders'))
    .catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
        setState({
          ...state,
          isOpenOrderDialog: false,
          isOpenNewOrderDialog: true,
          existingRestaurautName: e.response.data.existing_restaurant,
          newRestaurautName: e.response.data.new_restaurant,
        })
      } else {
        throw e;
      }
    })
  }

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood?.id,
      count: state.selectedFoodCount
    }).then(() => navigate('/orders'))
  };

  return (
    <Fragment>
      <div className="flex justify-around px-8 py-2">
        <Link to="/restaurants" >
          <img src={MainLogo} alt="main logo" className="h-[90px]" />
        </Link>
        <div className="pt-6">
          <Link to="/orders">
            <LocalMallIcon className="" htmlColor={"#02A457"} />
          </Link>
        </div>
      </div>
      <div className="flex justify-around flex-wrap">
        {
          foodState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i => {
                  return (
                    <div key={i} className="m-[16px]">
                      <Skeleton key={i} variant="rectangular" width={450} height={300} style={{ margin: '10px' }}/>
                    </div>
                  )
                })
                // [...Array(12).keys()].map(i => (
                //   <div key={i}>
                //   </div>
                // ))
              }
            </Fragment>
          :
          foodState.foodList.map((food: any) => {
            return (
              <div key={food.id} className="m-4">
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={
                    () => setState({
                      ...state,
                      isOpenOrderDialog: true,
                      selectedFood: food
                    }) 
                  }
                  imageUrl={FoodImage}
                />
              </div>
            )
          })
        }
      </div>
      {
        state.isOpenOrderDialog &&
          <FoodOrderDialog
            food={state.selectedFood}
            isOpen={state.isOpenOrderDialog}
            countNumber={state.selectedFoodCount}
            onClose={() => setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1
            })}
            onClickCountDown={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1
            })}
            onClickCountUp={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1
            })}
            onClickOrder={submitOrder}
           />
      }
      {
        state.isOpenNewOrderDialog &&
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurautName={state.existingRestaurautName}
          newRestaurautName={state.newRestaurautName}
          onClickSubmit={() => replaceOrder()}
        />
      }
    </Fragment>
  )
}

export default Foods;