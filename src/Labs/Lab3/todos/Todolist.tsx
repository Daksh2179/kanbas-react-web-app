import React from "react";
import todos from "./todos.json";
import TodoItem from "./TodoItem";
const TodoList = () => {
 return(
   <>
     <h3>Todo List</h3>
     <ul className="list-group">
       { todos.map(todo => {
           return(<TodoItem todo={todo}/>);
         })}
     </ul><hr/>
   </>
 );
}
export default TodoList;
