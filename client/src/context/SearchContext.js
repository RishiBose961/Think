import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  state: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (states, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return states;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [states, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        state: states.state,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
















