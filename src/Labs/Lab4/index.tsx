import React from 'react';
import ClickEvent from "./ClickEvents";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunction";
import EventObject from './EventObject';
import Counter from './Counter';
import BooleanStateVariables from './BooleanStateVariables';
import StringStateVariables from './StringStateVariable';
import DateStateVariable from './DateStateVariable';
import ObjectStateVariable from './ObjectStateVariable';
import ArrayStateVariable from './ArrayStateVariable';
import ParentStateComponent from './ParenStateComponent';
import { Provider } from 'react-redux';
import ReduxExamples from './ReduxExamples';
import store from '../store';

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-function">
      <h2>Lab 4</h2>
      <ClickEvent/>
      <PassingDataOnEvent/>
      <PassingFunctions theFunction={sayHello} />
      <EventObject/>
      <Counter/>
      <BooleanStateVariables/>
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariable/>
      <ArrayStateVariable/>
      <ParentStateComponent/>
      <Provider store={store}>
      <ReduxExamples />
    </Provider>
    </div>
  );
}
