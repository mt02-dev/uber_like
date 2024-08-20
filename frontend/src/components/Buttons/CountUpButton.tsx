import React from "react";

export const CountUpButton = ({
  onClick,
  isDisabled
}: {
  onClick: any,
  isDisabled: any
}) => (
  <button className="round-button" onClick={onClick} disabled={isDisabled}>+</button>
)