import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

import { LocalMallIcon, QueryBuilderIcon } from "./Icons";

export const OrderDetailItem = ({
  restaurantId,
  restaurantName,
  restaurantFee,
  timeRequired,
  foodCount,
  price,
}: {
  restaurantId: string;
  restaurantName: string;
  restaurantFee: number;
  timeRequired: number;
  foodCount: number;
  price: number;
}) => {
  return (
    <Fragment>
      <div className="flex justify-between">
        <LocalMallIcon />
        <Link to={`/restaurants/${restaurantId}/foods`}>
          {restaurantName}
        </Link>
      </div>
      <div className="flex justify-between">
        <QueryBuilderIcon />
        {timeRequired}分で到着予定
      </div>
      <div className="flex justify-between">
        <p>商品数: {foodCount}</p>
      </div>
      <div className="flex justify-between">
        <p>金額: ¥{price}</p>
      </div>
      <div className="flex justify-between">
        <p>配送料: ¥{restaurantFee}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-bold">合計金額: ¥{price + restaurantFee}</p>
      </div>

    </Fragment>
  )

}