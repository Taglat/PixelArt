import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({ topbar, grid, tools }) {
  return (
    <div className={cl.container}>
      <div className={cl.topbar}>{topbar}</div>
      <div className={cl.body}>
        {grid}
        {tools}
      </div>
    </div>
  );
}
