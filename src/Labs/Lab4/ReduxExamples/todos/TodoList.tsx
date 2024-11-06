
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

interface RootState {
  todosReducer: {
    todos: Array<{
      id: string;
      title: string;
    }>;
  };
}

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos?.map((todo) => ( 
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <hr/>
    </div>
  );
}