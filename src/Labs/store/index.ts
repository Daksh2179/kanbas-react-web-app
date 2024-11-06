import { configureStore } from "@reduxjs/toolkit";
import helloreducer from "../Lab4/ReduxExamples/HelloRedux/helloreducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";


const store = configureStore({
  reducer: {
    helloreducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});

export default store;