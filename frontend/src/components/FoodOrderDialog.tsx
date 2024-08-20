import React from "react";
import { DialogContent, Dialog, DialogTitle, DialogActions } from "@mui/material";
import OrderHeaderImage from '../images/order-header.png';
import { CountUpButton } from "./Buttons/CountUpButton";
import { CountDownButton } from "./Buttons/CountDownButton.";

export const FoodOrderDialog = ({
  food,
  countNumber,
  isOpen,
  onClose,
  onClickCountUp,
  onClickCountDown,
  onClickOrder
}: {
  food: any;
  countNumber: any;
  isOpen: any;
  onClose: any;
  onClickCountUp: any;
  onClickCountDown: any;
  onClickOrder: any;
}) => {

  return (
    // 引数2つとるisOpenがboolean, onCloseが関数(今回の場合はsetState)
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <img src={OrderHeaderImage} alt="order header" className="w-full h-[350px]"/>
      <div>
        <DialogTitle className="flex justify-around">
          <div>
            {food.name}
          </div>
          <div>
            ¥{food.price}
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="pt-0 px-2 pb-2">
            <div>
              {food.description}
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          {/* 数量操作アクション */}
          <div className="mr-auto flex py-4">
            <div className="my-2">
              <CountDownButton 
                onClick={onClickCountDown}
                // 1以下だったらカウントダウンさせない
                isDisabled={countNumber <=1}
              />
            </div>
            <div className="my-2">
              <div className="pt-[10px]">{countNumber}</div>
            </div>
            <div className="my-2">
              <CountUpButton 
                onClick={onClickCountUp}
                // 1以下だったらカウントダウンさせない
                isDisabled={countNumber >=9}
              />
            </div>
          </div>
          <button onClick={onClickOrder} className="order-button">
            <div className="flex">
              <div className="w-[300px]">
                {`${countNumber}点を注文に追加`}
              </div>
              <div className="pt-1">
                {`¥${countNumber * food.price}`}
              </div>

            </div>

          </button>
        </DialogActions>

      </div>

    </Dialog>

  )
}