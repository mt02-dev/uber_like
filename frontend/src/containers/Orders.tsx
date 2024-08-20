import React, { Fragment, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { getLineFoods } from "../apis/line_foods";
import { postOrder } from "../apis/order";
import { OrderDetailItem } from "../components/OrderDetailItem";
import { CircularProgress } from "@mui/material";

import { 
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer
} from "../reducers/lineFood"; 
import { orders } from "../urls";
import MainLogo from '../images/logo.png';
import { REQUEST_STATE } from "../constants";


const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);
  useEffect(() => {
    dispatch({type: lineFoodsActionTypes.FETCHING})
    getLineFoods()
      .then((data) => 
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            // 仮注文データ
            lineFoodsSummary: data
          }
        })
      )
      .catch((e) => console.log(e));
  }, [])

  const postLineFoods = () => {
    dispatch({type: lineFoodsActionTypes.POSTING});
    postOrder({
      line_foods_ids: state.lineFoodsSummary.line_foods_ids
    }).then(() => {
      dispatch({type: lineFoodsActionTypes.POST_SUCCESS});
      window.location.reload();
    });
  }

  const orderButtonLabel = () => {
    switch(state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました。';
      default:
        return '注文を確定する';
    }
  }

  return (
    <Fragment>
      <div className="flex justify-start py-2 px-8">
        <Link to='/restaurants'>
          <img src={MainLogo} alt="main logo" className="h-[90px]" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div>
          {/* OrderItemWrapper */}
          <div className="mb-[50px]">
            {
              state.fetchState === REQUEST_STATE.LOADING ?
                //ローディング用UIの表示
                <CircularProgress />
              :
                state.lineFoodsSummary &&
                <OrderDetailItem
                  restaurantFee={state.lineFoodsSummary.restaurant.fee}
                  restaurantName={state.lineFoodsSummary.restaurant.name}
                  restaurantId={state.lineFoodsSummary.restaurant.id}
                  timeRequired={state.lineFoodsSummary.restaurant.time_required}
                  foodCount={state.lineFoodsSummary.count}
                  price={state.lineFoodsSummary.amount}
                 />

            }
          </div> 
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
                <button 
                  className="order-button"
                  onClick={() => postLineFoods()}
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                > 
                  {orderButtonLabel()}
                </button>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
                <p>注文予定の商品はありません</p>
            }
          </div>
        </div>
      </div>
    </Fragment> 
  )
} 

export default Orders;