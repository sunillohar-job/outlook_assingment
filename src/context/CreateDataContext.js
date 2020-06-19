import React, { useReducer } from "react";
import { RESTORED_STATE_KEY, REDUX_SESSION_STORAGE_KEY } from "./contant";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const reducerMiddleWare = (state, action) => {
    const newState = reducer(state, action);
    sessionStorage.clear();
    sessionStorage.setItem(REDUX_SESSION_STORAGE_KEY, JSON.stringify(newState));
    return newState;
  };

  let restoreInitialState = { ...initialState };

  const reduxSessionState = sessionStorage.getItem(REDUX_SESSION_STORAGE_KEY);
  if (reduxSessionState) {
    const parsedReduxState = JSON.parse(reduxSessionState);
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
