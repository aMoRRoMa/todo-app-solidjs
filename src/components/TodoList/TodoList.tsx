import { For, Show, Suspense } from 'solid-js';

import { filteredTodos, TodoItem, todos, toggleTodo } from '../../store/todos';

import styles from './TodoList.module.css';

const TodoList = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Show when={todos()}>
      <div>
        <For each={filteredTodos()}>
          {(todo: TodoItem) => (
            <div class={styles.item} onClick={() => toggleTodo(todo)}>
              <span>{todo.title}</span>
            </div>
          )}
        </For>
      </div>
    </Show>
  </Suspense>
);

export default TodoList;
