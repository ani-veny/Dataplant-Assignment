import React, { useState } from 'react';
import MyModal from './model/Model';
import { Data } from '../utils/arr';
import UpdateSvg from './../utils/icons/edit.svg'
import DeleteSvg from './../utils/icons/delete.svg'
import './todo.css'
import { deleteTodosApi } from '../utils/deleteTodos';

interface TodoProps {
  text: Data;
  deleteTodo: (id: string) => void;
  updateTodo: (updateTodo: Data) => void;
}

const Todo: React.FC<TodoProps> = ({ text, updateTodo, deleteTodo }) => {
  const [show, setShow] = useState(false);

  const handleInputChange = (action: 'update' | 'delete'): void => {
    if (action === 'update') {
      setShow(true);
    } else {
      deleteTodosApi(text._id)
      deleteTodo(text._id);
    }
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    
      <tr className='todos'>
      <td>{text.title}</td>
      <td className='todo-description'>{text.description}</td>
      <td>{text.subject}</td>
      <td>
      {text.frequency!="Daily"?text.repeat:"At Daily"} at {" "}
      {text.time}</td>
      <td>
      <button onClick={() => handleInputChange('update')}>
        <img src={UpdateSvg} alt='update'/>
      </button>
      <button onClick={() => handleInputChange('delete')}>
        <img src={DeleteSvg} alt='delete'/>

      </button>
      </td>
      {show && (
        <MyModal
        isOpen={show}
        onClose={handleCloseModal}
        modelName="update"
        updateVal={text}
        updateTodoFn={updateTodo}
        />
        )}
        </tr>
  );
};

export default Todo;