import React, { useMemo, useState } from "react";

import style from "../assets/styles/TodoList.module.scss";
import { todoContext } from "../store/context";
import CustomCheckBox from "./CustomCheckBox";
import { MdClose } from "react-icons/md";

const TodoList = () => {
  // HDR: INITIALISER
  const [filter, setFilter] = useState("");

  const {
    state: { todos },
    dispatch,
  } = todoContext();

  //   HDR: ACTION HANDLERS
  const clearHandler = () => {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  };

  const changeHandler = (e) => {
    const { value } = e.target;

    dispatch({
      type: "UPDATE_COMPLETED",
      payload: value,
    });
  };

  const deleteHandler = (val) => {
    dispatch({
      type: "DELETE_TODO",
      payload: val,
    });
  };

  //   SUB: USEMEMO
  const itemLeft = useMemo(() => {
    return todos.reduce((acc, curr) => (acc += !curr.completed), 0);
  }, [todos]);

  //   HDR: JSX
  return (
    <>
      {todos && (
        <>
          <ul className={style.todo_list}>
            <div className={style.todo_list__container}>
              {todos
                ?.filter((item) => {
                  if (filter === null || filter === "") {
                    return item;
                  }

                  if (item.completed === filter) {
                    return item;
                  }
                })
                .map((todo, index) => (
                  <li key={index} className={style.list_item}>
                    <CustomCheckBox
                      title={todo.task}
                      value={todo.task}
                      id={todo.task}
                      name={todo.task}
                      onChange={changeHandler}
                      checked={todo.completed}
                    />
                    <MdClose
                      className={style.delete_icon}
                      onClick={() => deleteHandler(todo.task)}
                    />
                  </li>
                ))}
            </div>

            {/* HDR: TODO LIST FOOTER */}
            <div className={style.list_footer}>
              <p className={style.count}>{itemLeft} items left</p>
              <div className={style.cta}>
                <button
                  type="button"
                  onClick={() => setFilter("")}
                  className={filter === "" && "active"}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilter(false)}
                  className={filter === false && "active"}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setFilter(true)}
                  className={filter && "active"}
                >
                  Completed
                </button>
              </div>
              <button type="button" onClick={clearHandler}>
                clear completed
              </button>
            </div>
          </ul>

          {/* HDR: MOBILE NAVIGATION */}
          <div className={style.mobile_cta}>
            <button
              type="button"
              onClick={() => setFilter("")}
              className={filter === "" && "active"}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter(false)}
              className={filter === false && "active"}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setFilter(true)}
              className={filter && "active"}
            >
              Completed
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
