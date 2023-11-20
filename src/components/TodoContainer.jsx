import React from "react";

import style from "../assets/styles/TodoContainer.module.scss";
import { todoContext } from "../store/context";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoContainer = () => {
  const {
    state: { theme },
    dispatch,
  } = todoContext();

  const switchHandler = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.heading}>Todo</h1>
        <button type="button" className={style.switch} onClick={switchHandler}>
          {theme === "dark" ? <IoIosSunny size={35} /> : <FaMoon />}
        </button>
      </header>

      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoContainer;
