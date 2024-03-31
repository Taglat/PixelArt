import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({
  grid,
  tools,
  storyButtons,
  sizeInputs,
  size,
}) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size.width}, 1fr)`,
    gridTemplateRows: `repeat(${size.height}, 1fr)`,
  };

  return (
    <div className={cl.container}>
      <div className={cl.topbar}>
        {storyButtons} {sizeInputs}
      </div>
      <div className={cl.body}>
        <div style={gridStyle}>{grid}</div>
        <div className={cl.tools}>{tools}</div>
      </div>
    </div>
  );
}
