import React, { useState, useEffect, ChangeEvent } from "react";
import * as client from "./client";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = async () => {
    try {
      const response = await client.createTodo();
      const newTodos = Array.isArray(response) ? response : [];
      setTodos(newTodos);
    } catch (error) {
      console.error("Error creating todo:", error);
      setTodos([]);
    }
  };

  const postTodo = async () => {
    try {
      const newTodo = await client.postTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos(current => [...current, newTodo]);
    } catch (error) {
      console.error("Error posting todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await client.fetchTodos();
      const fetchedTodos = Array.isArray(response) ? response : [];
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const removeTodo = async (todo: Todo) => {
    try {
      const response = await client.removeTodo(todo);
      const updatedTodos = Array.isArray(response) ? response : [];
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(current => current.filter(t => t.id !== todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = (todo: Todo) => {
    setTodos(current =>
      current.map(t => t.id === todo.id ? { ...todo, editing: true } : t)
    );
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(current =>
        current.map(t => t.id === todo.id ? todo : t)
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Guard against todos not being an array
  if (!Array.isArray(todos)) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
            />
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <input
                className="form-control w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ 
                      ...todo, 
                      editing: false, 
                      title: (e.target as HTMLInputElement).value 
                    });
                  }
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}