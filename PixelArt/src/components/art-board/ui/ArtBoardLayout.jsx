import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({ grid, tools, storyButtons, sizeInputs }) {
  return (
    <div className={cl.container}>
      <div className={cl.topbar}>
        {storyButtons} {sizeInputs}
      </div>
      <div className={cl.body}>
        {grid}
        {tools}
      </div>
    </div>
  );
}
