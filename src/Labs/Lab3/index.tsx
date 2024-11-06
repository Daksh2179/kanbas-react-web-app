import React from 'react';
import VariablesAndConstants from './VariablesandConstants';
import VariableTypes from './VariableTypes';
import BooleanVariables from './BooleanVariables';
import IfElse from './IfElse';
import ConditionalOutputIfElse from './ConditionalOutputIfelse';
import ConditionalOutputInline from './ConditionalOutputinline';
import TernaryOperator from './TernaryOperator';
import LegacyFunctions from './LegacyFunction';
import ArrowFunctions from './ArrowFunction';
import ImpliedReturnComponent from './ImpliedReturn';
import TemplateLiterals from './TemplateLiteral';
import AddingAndRemovingToFromArrays from './AddingandremovingToFromArray';
import ArrayIndexAndLength from './ArrayIndexandLength';
import ForLoops from './ForLoop';
import FindFunction from './FindFunction';
import MapFunction from './MapFunction';
import FindIndex  from './FindIndex';
import FilterFunction from './FilterFunction';
import JsonStringify from './JsonStringify';
import House from './House';
import TodoItem from './todos/TodoItem';
import TodoList from './todos/Todolist';
import Spreading from './Spreading';
import Destructing from './Destructing';
import FunctionDestructing from './FunctionDestructing';
import DestructingImports from './DestructingImports';
import Classes from './Classes';
import Styles from './Style';
import Add from "./Add";
import Square from './Square';
import Highlight from "./Highlight";
import AddPathParameters from './AddPathParameters';
import PathParameters from './PathParameters';
import { useSelector } from "react-redux";


export default function Lab3() {
  const { todos } = useSelector((state: any) => state.todosReducer);
    return (
      <div>
        <h2>Lab 3</h2>
        <ul className="list-group">
        {todos.map((todo: any) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
      <hr />
        <VariablesAndConstants/>
        <VariableTypes/>
        <BooleanVariables/>
        <IfElse/>
        <ConditionalOutputIfElse/>
        <ConditionalOutputInline/>
        <TernaryOperator/>
        <LegacyFunctions/>
        <ArrowFunctions/>
        <ImpliedReturnComponent/>
        <TemplateLiterals/>
        <AddingAndRemovingToFromArrays/>
        <ArrayIndexAndLength/>
        <ForLoops/>
        <MapFunction/>
        <FindFunction/>
        <FindIndex/>
        <FilterFunction/>
        <JsonStringify/>
        <House/>
        <TodoItem/>
        <TodoList/>
        <Spreading/>
        <Destructing/>
        <FunctionDestructing/>
        <DestructingImports/>
        <Classes/>
        <Styles/>
        <Add a={3} b={4} />
        <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
     <PathParameters/>
     <AddPathParameters/>
      </div>
    );
  }
  