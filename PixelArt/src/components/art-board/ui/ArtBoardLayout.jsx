import cl from "./ZArtBoardLayout.module.css";

export function ArtBoardLayout({ grid }) {
  return <div className={cl.container}>{grid}</div>;
}
