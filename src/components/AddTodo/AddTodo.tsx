import { batch, createEffect, createSignal } from 'solid-js';
import { nanoid } from 'nanoid';

import { addTodo, Status } from '../../resources/todos';

const AddTodo = () => {
  const [title, setTitle] = createSignal('');

  createEffect(() => {
    if (title()) {
      batch(() => {
        addTodo(nanoid(), title(), Status.ACTIVE);
        setTitle('');
      });
    }
  });

  const setTitleHandler = (e: Event & { currentTarget: HTMLInputElement; target: Element }) => {
    e.preventDefault();
    setTitle(e.currentTarget.value);
  };

  return <input placeholder="Enter todo and press enter" required value={title()} onChange={setTitleHandler} />;
};

export default AddTodo;
