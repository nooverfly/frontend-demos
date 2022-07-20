const initialState = {
  username: "",
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  //
  switch (type) {
    case "SET_NAME":
      return {
        ...state,
        username: payload,
      };
    //
    default:
      return state;
  }
};

export default reducer;
