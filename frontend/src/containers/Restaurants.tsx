import React, { Fragment, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

import { featchRestaurants } from "../apis/restaurants";

import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png'
import RestaurantImage  from '../images/restaurant-image.jpg'

import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer
} from '../reducers/restaurants'

import { Restaurant } from "../types/restaurants/restaurants";
import { REQUEST_STATE } from "../constants";

const Restaurants = () => {

  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({type: restaurantsActionTypes.FETCHING}); 
    featchRestaurants()
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        dispatch({
          type: restaurantsActionTypes.FETCH_SUCCESS,
          // 通信時に送られるデータはpayloadと呼ばれる
          payload: {
            restaurants: data.restaurants
          }
        })
      }, 3000);
    });
  }, []);
  return (
    <Fragment>
      <div className="flex justify-start px-8 py-2">
        <img src={MainLogo} alt="main logo" className="h-[90px]" />
      </div>
      <div className="text-center">
        <img src={MainCoverImage} alt="main cover image" className="h-[600px]"/>
      </div>
      <div className="flex justify-around mb-[150px]">
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              <Skeleton variant="rectangular" width={450} height={300} style={{ margin: '10px' }}/>
              <Skeleton variant="rectangular" width={450} height={300} style={{ margin: '10px' }}/>
              <Skeleton variant="rectangular" width={450} height={300} style={{ margin: '10px' }}/>
            </Fragment>  
          :
            state.restaurantsList.map((restaurant: Restaurant, index: number) => {
              return (
                <Link to={`/restaurants/${restaurant.id}/foods`} key={index}> 
                  <div className="w-[450px] h-[300px] p-12" >
                    <img src={RestaurantImage} alt="" />
                    <p className="text-stone-950 text-[18px]">{restaurant.name}</p>
                    <p className="text-stone-950 text-[12px]">{`配送料: ${restaurant.fee}円 配送時間: ${restaurant.time_required}分`}</p>
                  </div>
                </Link>
              );
          })
        }
      </div>
      
    </Fragment> 
  ) 
}

export default Restaurants;



