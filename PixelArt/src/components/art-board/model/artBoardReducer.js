export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TOOL_CHANGE: "tool-change",
};

export const initArtBoardState = ({ size }) => ({
  tool: "pen",
  color: "#000",
  size: size,
  cells: new Array(size * size).fill(null),
});

export const artBoardReducer = (state, action) => {
  switch (action.type) {
    case ART_BOARD_STATE_ACTIONS.CELL_CLICK: {
      if (state.cells[action.index] && state.tool === "pen") {
        console.log('PEN');
        return state;
      } else if (!state.cells[action.index] && state.tool === "eraser") {
        console.log('ERASER');
        return state;
      }

      return {
        ...state,
        cells: updateCell(state, action.index),
      };
    }
    case ART_BOARD_STATE_ACTIONS.TOOL_CHANGE: {
      return {
        ...state,
        tool: action.tool,
      };
    }
    default: {
      return state;
    }
  }
};

function updateCell(artBoardState, index) {
  if (artBoardState.tool === "pen") {
    return artBoardState.cells.map((cell, i) =>
      i === index ? artBoardState.color : cell,
    );
  } else if (artBoardState.tool === "eraser") {
    return artBoardState.cells.map((cell, i) =>
      i === index ? null : cell,
    );
  }
}