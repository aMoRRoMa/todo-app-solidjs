import { createSelector, For } from 'solid-js';

import { Filter as options, filter, setFilter } from '../../store/filter';

const Filter = () => {
  const isSelected = createSelector(filter);
  return (
    <For each={Object.values(options)}>
      {(option) => (
        <button disabled={isSelected(option)} onClick={() => setFilter(option)}>
          {option}
        </button>
      )}
    </For>
  );
};

export default Filter;
