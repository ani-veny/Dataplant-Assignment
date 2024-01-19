// src/TodoList.tsx
import React from 'react';
import Todo from './Todo';
import { Data } from '../utils/arr';
import './todolist.css'

interface TodoListProps {
  todos: Data[];
  updateTodo: (updatedTodo: Data) => void;
  deleteTodo: (id: (string)) => void;
}



const TodoList: React.FC<TodoListProps> = ({ todos,updateTodo,deleteTodo }) => {
  return (
    <table style={{width:'100%'}}>
      <thead>
     <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Subject</th>
    <th>Schedule</th>
    <th>Actions</th>
  </tr>
      </thead>
      <tbody>
    {todos.map((todo, index) => (
      <Todo key={index} text={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
      </tbody>
    </table>
  );
};

export default TodoList;
