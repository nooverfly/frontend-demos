import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState: any = {
  allIds: [],
  byIds: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO: {
      let { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false,
          },
        },
      };
    }
    case TOGGLE_TODO: {
      let { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      };
    }
    default:
      return state;
  }
}
