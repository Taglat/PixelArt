export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TOOL_CHANGE: "tool-change",
  UNDO: "undo",
  REDO: "redo",
  SIZE_CHANGE: "size-change",
};

export const initArtBoardState = ({ size }) => ({
  tool: "pen",
  color: "#000",
  size: {
    width: size.width,
    height: size.height,
  },
  cells: new Array(size.width * size.height).fill(null),
  history: [],
  future: [],
});

export const artBoardReducer = (state, action) => {
  switch (action.type) {
    case ART_BOARD_STATE_ACTIONS.CELL_CLICK: {
      if (state.cells[action.index] && state.tool === "pen") {
        return state;
      } else if (!state.cells[action.index] && state.tool === "eraser") {
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
      let cells;
      let size;

      let history = [...state.history];
      let future = [...state.future, state.cells];

      if (history[history.length - 1].width) {
        console.log("size UNDO");
        size = history.pop();
        if (!history[history.length - 1].width) {
          let cells = history.pop();
          return { ...state, size, cells, history, future };
        }
        return { ...state, size, cells: state.cells, history, future };
      } else {
        console.log("cells UNDO");
        cells = history.pop();
        console.log(state.size)
        return { ...state, cells, size: state.size, history, future };
      }
    }
    case ART_BOARD_STATE_ACTIONS.REDO: {
      if (state.future.length === 0) {
        return state;
      }
      let cells;
      let size;
      let future = [...state.future];

      let history = [...state.history, state.cells];
      if (future[future.length - 1].width) {
        size = future.pop;
        return { ...state, size, history, future };
      } else {
        cells = future.pop();
        return { ...state, cells, history, future };
      }
    }
    case ART_BOARD_STATE_ACTIONS.SIZE_CHANGE: {
      console.log(action.width, action.height);
      return {
        ...state,
        cells: new Array(action.width * action.height).fill(null),
        size: {
          width: action.width,
          height: action.height,
        },
        history: [
          ...state.history,
          state.cells,
          {
            width: state.size.width,
            height: state.size.height,
          },
        ],

        future: [],
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
    return artBoardState.cells.map((cell, i) => (i === index ? null : cell));
  }
}
