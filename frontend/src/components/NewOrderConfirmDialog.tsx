import React from "react";

import { DialogContent, Dialog, DialogTitle } from "@mui/material";

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurautName,
  newRestaurautName,
  onClickSubmit
}:{
  isOpen: boolean;
  onClose: any;
  existingRestaurautName: string; 
  newRestaurautName: string;
  onClickSubmit: any
}) => {
  return (
    <Dialog 
      open={isOpen}
      onClose={onClose}
      maxWidth='xs'
    >
      <DialogTitle>新規注文を開始しますか？</DialogTitle>
      <DialogContent>
        <p>
          {
            `ご注文に ${existingRestaurautName} の商品が含まれています。
            新規の注文を開始して ${newRestaurautName} の商品を追加してください。`
          }
        </p>
        <button onClick={onClickSubmit} className="order-button">新規注文</button>
      </DialogContent>
    </Dialog>
  )
}
