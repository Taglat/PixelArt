import clsx from "clsx";
import cl from "./ZCell.module.css";

const getColor = (color, isOdd) => {
  if (color === null) {
    return isOdd ? "#dddddd" : "#ffffff";
  } else {
    return color;
  }
};

export const Cell = ({ color, isOdd, onClick, firstClick }) => {
  return (
    <div
      className={clsx(cl.cell, firstClick && cl.firstClick)}
      style={{ background: getColor(color, isOdd) }}
      onClick={() => onClick()}
    />
  );
};
