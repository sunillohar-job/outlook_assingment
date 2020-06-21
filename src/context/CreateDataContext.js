import React, { useReducer } from "react";
import { RESTORED_STATE_KEY } from "./contant";

export default (reducer, actions, initialState, STORAGE_KEY) => {
  const Context = React.createContext();

  const reducerMiddleWare = (state, action) => {
    const newState = reducer(state, action);
    localStorage.clear();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    return newState;
  };

  let restoreInitialState = { ...initialState };

  const reduxLocalStorageState = localStorage.getItem(STORAGE_KEY);
  if (reduxLocalStorageState) {
    const parsedReduxState = JSON.parse(reduxLocalStorageState);
    restoreInitialState = { ...restoreInitialState, ...parsedReduxState };
    restoreInitialState[RESTORED_STATE_KEY] = true;
  }

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(
      reducerMiddleWare,
      restoreInitialState
    );

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
