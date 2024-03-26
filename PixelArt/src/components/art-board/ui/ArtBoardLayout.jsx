import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({ grid, tools }) {
  return (
    <div className={cl.container}>
      {grid}
      {tools}
    </div>
  );
}
