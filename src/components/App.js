import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import Template from "../components/Template";
import TodoList from "../components/TodoList";
import "./App.css";
import TodoInsert from "./TodoInsert";

let nextId = 4;
function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [hiddenToggle, setHiddenTogle] = useState(true);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true,
    },
    {
      id: 2,
      text: "할일 2",
      checked: false,
    },
    {
      id: 3,
      text: "할일 3",
      checked: true,
    },
  ]);
  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
    setHiddenTogle((prev) => !prev);
  };

  const onInsertTodo = (text) => {
    if (text === "") {
      return alert("할 일을 입력하시오");
    } else {
      const todo = {
        id: nextId,
        text: text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo));
      nextId++;
    }
  };

  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onRemove = (id) => {
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <Template todoLength={todos.length}>
      <TodoList
        todos={todos}
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      {hiddenToggle && (
        <div className="add-todo-btn">
          <MdAddCircle onClick={(onChangeSelectedTodo, onInsertToggle)} />
        </div>
      )}
      {insertToggle && (
        <TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )}
    </Template>
  );
}

export default App;
