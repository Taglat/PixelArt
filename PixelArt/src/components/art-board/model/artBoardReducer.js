export const ART_BOARD_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
};

export const initArtBoardState = ({size}) => ({
  color: "#000",
  size: size,
  cells: new Array(size * size).fill(null),
});

export const artBoardReducer = (state, action) => {
  console.log(state);
  
  switch (action.type) {
    case ART_BOARD_STATE_ACTIONS.CELL_CLICK: {
      const { index } = action;

      if (state.cells[index]) {
        return state;
      };

      return {
        ...state,
        cells: updateCell(state, action.index),
      };
    }
    default: {
      return state;
    }
  }
};

function updateCell(artBoardState, index) {
  return artBoardState.cells.map((cell, i) =>
    i === index ? artBoardState.color : cell,
  );
}
