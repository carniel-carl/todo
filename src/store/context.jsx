import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";

const StoreContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    theme: "dark",
    todos: [
      { task: "Do the laundry", completed: true },
      { task: "Learn to code", completed: false },
      { task: "Take a walk", completed: false },
    ],
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const todoContext = () => {
  return useContext(StoreContext);
};

export default Context;
export { todoContext };
