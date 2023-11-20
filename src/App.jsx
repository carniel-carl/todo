import { todoContext } from "./store/context";
import style from "./assets/styles/App.module.scss";
import TodoContainer from "./components/TodoContainer";

function App() {
  const {
    state: { theme },
  } = todoContext();

  return (
    <section className={style.todo}>
      <div className={`${style.banner} ${theme === "dark" && style.bgDark}`} />
      <TodoContainer />
    </section>
  );
}

export default App;
