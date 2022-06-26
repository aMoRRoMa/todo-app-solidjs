import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Filter from '../Filter/Filter';

import styles from './App.module.css';

const App = () => {
  return (
    <div class={styles.App}>
      <h1>Simple Todos Example</h1>
      <Filter />
      <TodoList />
      <br />
      <br />
      <AddTodo />
    </div>
  );
};

export default App;
