import { TodoItem, todos } from '../resources/todos';

import { filter, Filter } from './filter';
import { createMemo } from 'solid-js';

const getFilteredTodos = (todos: TodoItem[], filter: Filter) => {
  if (filter === Filter.ALL) return todos;
  return todos.filter((item: TodoItem) => item.status.toString() === filter.toString());
};

export default createMemo(() => getFilteredTodos(todos(), filter()));
