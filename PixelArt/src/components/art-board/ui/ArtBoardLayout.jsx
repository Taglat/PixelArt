import clsx from "clsx";
import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({
  grid,
  tools,
  storyButtons,
  sizeInputs,
  size,
  reset
}) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size.width}, 1fr)`,
    gridTemplateRows: `repeat(${size.height}, 1fr)`,
    margin: "0 auto",
  };

  const isLowHeight = size.height < 8 ? true : false;

  return (
    <div className={cl.container}>
      <div className={cl.topbar}>
        {storyButtons} {sizeInputs} 
        {reset}
      </div>
      <div className={cl.body}>
        <div style={gridStyle}>{grid}</div>
        <div className={clsx(isLowHeight && cl.lowHeight)} >{tools}</div>
      </div>
    </div>
  );
}
