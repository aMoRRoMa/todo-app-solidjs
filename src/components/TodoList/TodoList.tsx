import { For, Show, Suspense } from 'solid-js';

import { TodoItem, todos, toggleTodo } from '../../resources/todos';
import filteredTodos from '../../memos/filteredTodos';

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
