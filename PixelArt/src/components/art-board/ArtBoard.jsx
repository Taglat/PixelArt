import { useReducer } from "react";
import {
  artBoardReducer,
  initArtBoardState,
  ART_BOARD_STATE_ACTIONS,
} from "./model/artBoardReducer";
import { ArtBoardLayout } from "./ui/ArtBoardLayout";
import { Cell } from "./ui/Cell";
import { ToolsIcons } from "./constants";
import { Tool } from "./ui/Tool";

export function ArtBoard() {
  const [artBoardState, dispatch] = useReducer(
    artBoardReducer,
    {
      size: 25,
    },
    initArtBoardState,
  );

  const { cells, size } = artBoardState;
  console.log(cells);
  console.log(size);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
  };

  return (
    <ArtBoardLayout
      grid={
        <div style={gridStyle}>
          {cells.map((cell, index) => (
            <Cell
              color={cell}
              key={index}
              isOdd={index % 2}
              onClick={() => {
                dispatch({
                  type: ART_BOARD_STATE_ACTIONS.CELL_CLICK,
                  index,
                });
                console.log(cell, index);
              }}
            />
          ))}
        </div>
      }
      tools={ToolsIcons.map((tool, index) => {
        return (
          <Tool
            title={tool.name}
            iconSrc={tool.iconSrc}
            key={index}
            onClick={() => {
              console.log(tool.name);
              dispatch({
                type: ART_BOARD_STATE_ACTIONS.TOOL_CHANGE,
                tool: tool.name,
              });
            }}
          />
        );
      })}
    />
  );
}

// ArtBoard | Tools, Grid, TopBar
