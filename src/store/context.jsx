import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";

const StoreContext = createContext();

const Context = ({ children }) => {
  const userMode = () => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDarkMode) {
      // User prefers dark mode
      return "dark";
    } else {
      // User prefers light mode
      return "light";
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    theme: localStorage.getItem("TODO_THEME")
      ? localStorage.getItem("TODO_THEME")
      : userMode(),
    todos: [
      { task: "Do the laundry", completed: true },
      { task: "Learn to code", completed: false },
      { task: "Take a walk", completed: false },
    ],
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);

    if (state.theme) {
      localStorage.setItem("TODO_THEME", state.theme);
    }
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
