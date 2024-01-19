// src/App.tsx
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import MyModal from "./components/model/Model";
import { Data, dummy } from "./utils/arr";
import SearchSvg from "./utils/icons/search.svg";
import AddTodoSvg from './utils/icons/add.svg'

import "./App.css";
import { getTodosApi } from "./utils/getTodos";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Data[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const updateTodo = (updatedTodo: Data) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const addTodo = (data: Data) => {
    setTodos((prevTodos) => [...prevTodos, data]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  const searchButtonHandler = async () => {
    try {
      const data = await getTodosApi(`/?search=${search}`);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const handleAddTodo = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function getData(){
    let data = await getTodosApi('/')
    setTodos(data)
  }

  useEffect(() => {
   
    getData()
  }, []);

  return (
    <div className='main-container'>
      <div className='side-rectangle'></div>
      <div className='todo-container'>
        <div className='top-rectangle'></div>
        <div className='addSearch-todo'>
          <div className="searchBox">
            <input
              type='text'
              className="searchInput"
              placeholder="search.."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <span onClick={()=>searchButtonHandler()} className="search-btn">
              <img src={SearchSvg} alt='search' />
            </span>
          </div>
          <div className="addTodo-btn">
            <div onClick={handleAddTodo} className="text-addTodo-btn">
              <div>
              <img src={AddTodoSvg} alt="add"/>
              </div>
              <div className="Add-text">
              Add
              </div>
            </div>
          </div>
        </div>
        <div className='todoList-container'>
          <TodoList
            todos={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </div>
        {isModalOpen && (
          <MyModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            modelName='submit'
            addTodo={addTodo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
