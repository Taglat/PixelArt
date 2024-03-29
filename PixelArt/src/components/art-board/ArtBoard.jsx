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
import { StoryButtons } from "./ui/StoryButtons";
import { SizeInputs } from "./ui/SizeInputs";

export function ArtBoard() {
  const [artBoardState, dispatch] = useReducer(
    artBoardReducer,
    {
      size: {
        width: 25,
        height: 25,
      },
    },
    initArtBoardState,
  );

  const { cells, size } = artBoardState;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size.width}, 1fr)`,
    gridTemplateRows: `repeat(${size.height}, 1fr)`,
  };

  return (
    <ArtBoardLayout
      storyButtons={
        <StoryButtons
          prevHistory={() =>
            dispatch({
              type: ART_BOARD_STATE_ACTIONS.UNDO,
            })
          }
          nextHistory={() =>
            dispatch({
              type: ART_BOARD_STATE_ACTIONS.REDO,
            })
          }
        />
      }
      sizeInputs={<SizeInputs width={size.width} height={size.height} />}
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
            selected={artBoardState.tool == tool.name}
          />
        );
      })}
    />
  );
}

// ArtBoard | Tools, Grid, TopBar
