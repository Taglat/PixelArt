import { useEffect, useReducer, useState } from "react";
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

  const [color, setColor] = useState(artBoardState.color);
  useEffect(() => {
    setColor(artBoardState.color);
  });

  const handleColorChange = (event) => {
    setColor(event.target.value);

    dispatch({
      type: ART_BOARD_STATE_ACTIONS.COLOR_CHANGE,
      color: event.target.value,
    });
  };

  console.log(artBoardState);

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
      sizeInputs={
        <SizeInputs
          width={artBoardState.size.width}
          height={artBoardState.size.height}
          onClick={(width, height) => {
            dispatch({
              type: ART_BOARD_STATE_ACTIONS.SIZE_CHANGE,
              width: width,
              height: height,
            });
          }}
        />
      }
      reset={
        <button
          className="btn center"
          onClick={() => {
            dispatch({
              type: ART_BOARD_STATE_ACTIONS.RESET,
            });
          }}
        >
          Reset
        </button>
      }
      grid={artBoardState.cells.map((cell, index) => {
        const x = index % artBoardState.size.width;
        const y = Math.floor(index / artBoardState.size.width);
        const isOdd = (x + y) % 2;

        return (
          <Cell
            color={cell}
            key={index}
            isOdd={isOdd}
            firstClick={index === artBoardState.startCellIndex && true}
            onClick={() => {
              dispatch({
                type: ART_BOARD_STATE_ACTIONS.CELL_CLICK,
                index,
              });
            }}
          />
        );
      })}
      tools={
        <>
          <input type="color" className="color" value={color} onChange={handleColorChange} />'
          {ToolsIcons.map((tool, index) => {
            return (
              <Tool
                title={tool.name}
                iconSrc={tool.iconSrc}
                key={index}
                onClick={() => {
                  dispatch({
                    type: ART_BOARD_STATE_ACTIONS.TOOL_CHANGE,
                    tool: tool.name,
                  });
                }}
                selected={artBoardState.tool == tool.name}
              />
            );
          })}
        </>
      }
      size={artBoardState.size}
    />
  );
}

// ArtBoard | Tools, Grid, TopBar
