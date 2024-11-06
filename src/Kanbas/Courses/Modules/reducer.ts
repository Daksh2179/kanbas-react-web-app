import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";

// Define TypeScript interfaces
interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload }) => {
      const newModule: Module = {
        _id: new Date().getTime().toString(),
        name: payload.name,
        description: "",
        course: payload.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload }) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },
    updateModule: (state, { payload }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    editModule: (state, { payload }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;