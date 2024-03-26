export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TOOL_CHANGE: "tool-change",
  UNDO: "undo",
  REDO: "redo",
};

export const initArtBoardState = ({ size }) => ({
  tool: "pen",
  color: "#000",
  size: size,
  cells: new Array(size * size).fill(null),
  history: [],
  future: [],
});

export const artBoardReducer = (state, action) => {
  switch (action.type) {
    case ART_BOARD_STATE_ACTIONS.CELL_CLICK: {
      if (state.cells[action.index] && state.tool === "pen") {
        console.log("PEN");
        return state;
      } else if (!state.cells[action.index] && state.tool === "eraser") {
        console.log("ERASER");
        return state;
      }

      let newState = {
        ...state,
        cells: updateCell(state, action.index),
      };

      return {
        ...newState,
        history: [...state.history, state.cells],
        future: [],
      };
    }
    case ART_BOARD_STATE_ACTIONS.TOOL_CHANGE: {
      return {
        ...state,
        tool: action.tool,
      };
    }
    case ART_BOARD_STATE_ACTIONS.UNDO: {
      if (state.history.length === 0) {
        return state;
      }

      let history = [...state.history];
      let future = [...state.future, state.cells];
      let cells = history.pop();

      return { ...state, cells, history, future };
    }
    case ART_BOARD_STATE_ACTIONS.REDO: {
      if (state.future.length === 0) {
        return state;
      }

      let future = [...state.future];
      let history = [...state.history, state.cells];
      let cells = future.pop();

      return { ...state, cells, history, future };
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
    return artBoardState.cells.map((cell, i) => (i === index ? null : cell));
  }
}
