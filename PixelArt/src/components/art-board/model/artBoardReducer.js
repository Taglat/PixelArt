export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TOOL_CHANGE: "tool-change",
  UNDO: "undo",
  REDO: "redo",
};

export const initArtBoardState = ({ size }) => ({
  tool: "pen",
  color: "#000",
  size: {
    width: size.width,
    height: size.height,
  },
  cells: new Array(size.width * size.height).fill(null),
  history: {
    cells: [],
    size: [],
  },
  future: { cells: [], size: [] },
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
        history: {
          cells: [...state.history.cells, state.cells],
          size: [...state.history.size],
        },
        future: { cells: [], size: [] },
      };
    }
    case ART_BOARD_STATE_ACTIONS.TOOL_CHANGE: {
      return {
        ...state,
        tool: action.tool,
      };
    }
    case ART_BOARD_STATE_ACTIONS.UNDO: {
      if (state.history.cells.length === 0) {
        return state;
      }

      let history = {
        cells: [...state.history.cells],
        size: [...state.history.size],
      };
      let future = {
        cells: [...state.future.cells, state.cells],
        size: [...state.future.size],
      };
      let cells = history.cells.pop();

      return { ...state, cells, history, future };
    }
    case ART_BOARD_STATE_ACTIONS.REDO: {
      if (state.future.cells.length === 0) {
        return state;
      }

      let future = {
        cells: [...state.future.cells],
        size: [...state.future.size],
      };
      let history = {
        cells: [...state.history.cells, state.cells],
        size: [...state.history.size],
      };
      let cells = future.cells.pop();

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
