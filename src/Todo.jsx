import React, { memo } from 'react';

const Todo = ({ todos, AddTodos }) => {
  console.log('Child render again!!');
  return (
    <>
      <h4>Todo List</h4>
      <button onClick={AddTodos}>Add todo</button>
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
    </>
  );
};
export default memo(Todo);
