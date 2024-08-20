import React, { Fragment, useEffect } from "react";
import { getLineFoods } from "../apis/line_foods";

const Orders = () => {
  useEffect(() => {
    getLineFoods()
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, [])
  
  return (
    <Fragment>
      注文画面
    </Fragment> 
  )
} 

export default Orders;