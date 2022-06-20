import { createClient } from '@urql/core';
import { createEffect, createResource, createSignal } from 'solid-js';

import { filter, Filter } from './filter';

const client = createClient({
  url: 'http://0.0.0.0:4000/graphql',
});

export enum Status {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface TodoItem {
  id: string;
  title: string;
  status: Status;
}

export const [todos, { mutate, refetch }] = createResource(() =>
  client
    .query(
      `
    query {
      getTodos {
        id
        title
        status
      }
    }
  `
    )
    .toPromise()
    .then(({ data }) => data.getTodos)
);
export const [filteredTodos, setFilteredTodos] = createSignal([]);
createEffect(() => {
  if (filter() === Filter.ALL) return setFilteredTodos(todos());
  return setFilteredTodos(todos().filter((item: TodoItem) => item.status.toString() === filter().toString()));
});

export const addTodo = async (id: string, title: string, status: string) => {
  await client
    .mutation(
      `
    mutation($id: ID!, $title: String!, $status: String!) {
      addTodo(id: $id, title: $title, status: $status) {
        id
      }
    }`,
      {
        id,
        title,
        status,
      }
    )
    .toPromise();
  refetch();
};

export const toggleTodo = async (todo: TodoItem) => {
  await client
    .mutation(
      `
    mutation($id: ID!, $status: String!) {
      setStatus(id: $id, status: $status) {
        id
      }
    }`,
      {
        id: todo.id,
        status: todo.status === Status.ACTIVE ? Status.COMPLETED : Status.ACTIVE,
      }
    )
    .toPromise();
  refetch();
};
