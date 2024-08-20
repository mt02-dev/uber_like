// food1つずつのitemを表す
import React from "react";

export const FoodWrapper = ({
  food,
  onClickFoodWrapper,
  imageUrl,
} :
{
  food: any,
  onClickFoodWrapper: any,
  imageUrl: any
}) => {
  return (
    <div onClick={onClickFoodWrapper} className="flex w-[450px] h-[180px] border ">
      <div >
        {food.name}
      </div>
      <div>
        {food.description}
      </div> 
      <div>
        ¥{food.price}
      </div>
      <div>
        <img src={imageUrl} alt="商品画像" /> 

      </div>
    </div>
  )
}

