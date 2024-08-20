// --- ここから追加 ---
import React from 'react';


export const CountDownButton = ({
  onClick,
  isDisabled,
}: {
  onClick: any,
  isDisabled: any
}) => (
  <button onClick={onClick} disabled={isDisabled} className="round-button">
    -
  </button>
)
// --- ここまで追加 ---
