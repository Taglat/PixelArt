import cl from "./ZCell.module.css";

const getColor = (color, isOdd) => {
  if (color === null) {
    return isOdd ? "#dddddd" : "#ffffff";
  } else {
    return color;
  }
};

export const Cell = ({ color, isOdd, onClick }) => {
  return (
    <div
      className={cl.cell}
      style={{ background: getColor(color, isOdd) }}
      onClick={() => onClick()}
    />
  );
};
