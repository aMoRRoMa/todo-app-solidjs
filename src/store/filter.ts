import { createSignal } from 'solid-js';

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const [filter, setFilter] = createSignal(Filter.ALL);
