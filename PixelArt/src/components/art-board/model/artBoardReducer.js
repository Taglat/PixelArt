export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TOOL_CHANGE: "tool-change",
  UNDO: "undo",
  REDO: "redo",
  SIZE_CHANGE: "size-change",
  RESET: "reset",
};

export const ART_BOARD_STATE_TOOLS = {
  PEN: "pen",
  ERASER: "eraser",
  LINE: "line",
};

export const initArtBoardState = ({ size }) => ({
  tool: ART_BOARD_STATE_TOOLS.PEN,
  color: "#000",
  size: {
    width: size.width,
    height: size.height,
  },
  cells: new Array(size.width * size.height).fill(null),
  history: [],
  future: [],
  startCellIndex: null,
});

export const artBoardReducer = (state, action) => {
  switch (action.type) {
    case ART_BOARD_STATE_ACTIONS.CELL_CLICK: {
      if (
        state.tool === ART_BOARD_STATE_TOOLS.LINE &&
        state.startCellIndex === null
      ) {
        return { ...state, startCellIndex: action.index };
      } else {
        if (
          state.cells[action.index] &&
          state.tool === ART_BOARD_STATE_TOOLS.PEN
        ) {
          return state;
        } else if (
          !state.cells[action.index] &&
          state.tool === ART_BOARD_STATE_TOOLS.ERASER
        ) {
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
          startCellIndex: null,
        };
      }
    }
    case ART_BOARD_STATE_ACTIONS.TOOL_CHANGE: {
      return {
        ...state,
        tool: action.tool,
        startCellIndex: null,
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
        size = history.pop();
        if (!history[history.length - 1].width) {
          let cells = history.pop();
          return { ...state, size, cells, history, future, startCellIndex: null };
        }
        return { ...state, size, cells: state.cells, history, future };
      } else {
        console.log("cells UNDO");
        cells = history.pop();
        console.log(state.size);
        return { ...state, cells, size: state.size, history, future, startCellIndex: null };
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
        return { ...state, size, history, future, startCellIndex: null };
      } else {
        cells = future.pop();
        return { ...state, cells, history, future, startCellIndex: null };
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
        startCellIndex: null,
      };
    }
    case ART_BOARD_STATE_ACTIONS.RESET: {
      return {
        ...state,
        cells: new Array(state.size.width * state.size.height).fill(null),
        history: [...state.history, state.cells],
        future: [],
        startCellIndex: null,
      };
    }
    default: {
      return state;
    }
  }
};

function updateCell(artBoardState, index) {
  if (artBoardState.tool === ART_BOARD_STATE_TOOLS.PEN) {
    return artBoardState.cells.map((cell, i) =>
      i === index ? artBoardState.color : cell,
    );
  } else if (artBoardState.tool === ART_BOARD_STATE_TOOLS.ERASER) {
    return artBoardState.cells.map((cell, i) => (i === index ? null : cell));
  } else if (artBoardState.tool === ART_BOARD_STATE_TOOLS.LINE) {
    const cells = [...artBoardState.cells];

    let startX = artBoardState.startCellIndex % artBoardState.size.width;
    let startY = Math.floor(artBoardState.startCellIndex / artBoardState.size.width);
    let endX = index % artBoardState.size.width;
    let endY = Math.floor(index / artBoardState.size.width);

    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
      for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
        cells[startY * artBoardState.size.width + x] = artBoardState.color;
      }
    } else {
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
        cells[y * artBoardState.size.width + startX] = artBoardState.color;
      }
    }

    return cells;
  }
}
