import React, { useRef } from "react";
import style from "../assets/styles/TodoForm.module.scss";
import CustomCheckBox from "./CustomCheckBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoShema } from "../schema";
import { todoContext } from "../store/context";

const TodoForm = () => {
  // HDR: hook form
  const { dispatch } = todoContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoShema),
    defaultValues: {
      task: "",
      completed: false,
    },
  });

  const submitHandler = (formData) => {
    dispatch({
      type: "ADD_TODO",
      payload: formData,
    });

    reset();
  };

  return (
    <form
      className={`${style.todo_form} ${errors.task && style.error}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <CustomCheckBox
        form="true"
        name="completed"
        id="completed"
        {...register("completed")}
      />
      <input
        name="task"
        id="task"
        type="text"
        className={style.input}
        autoComplete="off"
        placeholder="Create a new todo ..."
        {...register("task")}
      />
      <button type="submit" className={style.save_btn}>
        Save
      </button>
    </form>
  );
};

export default TodoForm;
