import React, { useReducer } from 'react';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        draft: state.draft,
        done: !state.done,
      };
    case 'field':
      return {
        ...state,
        draft: action.payload,
      };
  }
};
const initialState = {
  draft: '',
  done: false,
};

const Test = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { draft, done } = state;
  const onPush = (e) => {
    e.preventDefault();
    dispatch({ type: 'test' });
  };
  return (
    <>
      <form onSubmit={onPush}>
        <input
          type="text"
          value={draft}
          onChange={(e) =>
            dispatch({ type: 'field', field: 'draft', payload: e.target.value })
          }
        />
        <button type="submit">Push</button>
        <br />
        <span>{done ? draft : ''}</span>
      </form>
    </>
  );
};
export default Test;
