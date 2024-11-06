import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import "./style.css";
import { Course } from "../../Database/index";


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
  lessons: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const dispatch = useDispatch();
  const course: Course = useSelector((state: any) => state.courses.find((c: Course) => c._id === cid));

  const handleAddModule = () => {
    dispatch(
      addModule({
        name: "New Module",
        description: "Click to add module description",
        course: cid,
        lessons: []
      })
    );
  };

  const handleUpdateModule = (module: Module, newName: string) => {
    dispatch(
      updateModule({
        ...module,
        name: newName,
        editing: false
      })
    );
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <li
              key={module._id}
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <div className="d-inline-block w-75">
                  {!module.editing ? (
                    <>
                      <div>{module.name}</div>
                      <div className="text-muted fs-6">{module.description}</div>
                    </>
                  ) : (
                    <input
                      className="form-control w-75 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateModule(module, e.currentTarget.value);
                        }
                      }}
                      value={module.name}
                    />
                  )}
                </div>
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <li
                      key={lesson._id}
                      className="wd-lesson list-group-item p-3 ps-4"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      <div className="d-inline-block">
                        <div>{lesson.name}</div>
                        <div className="text-muted fs-6">
                          {lesson.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}