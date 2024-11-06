import React , { useState } from 'react';
import { useParams } from "react-router";
import GreenCheckmark from "./GreenCheckmark";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from './ModuleControlButtons';
import LessonControlButtons from './LessonControlButtons';
import ModulesControls from './ModulesControls';
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
function Modules() {
 
  const { cid } = useParams();
  // const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  // const addModule = () => {
  //   setModules([ ...modules, { _id: new Date().getTime().toString(),
  //                                    name: moduleName, course: cid, lessons: [] } ]);
  //   setModuleName("");
  // };
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  // const editModule = (moduleId: string) => {
  //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();


   return (
    <div className="modules-container">
      <div className="content-wrapper">
        <div className="main-content">
          <div className="modules-controls">
          <ModulesControls setModuleName={setModuleName} moduleName={moduleName}   addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} />

            <button className="btn btn-secondary">Collapse All</button>
            <button className="btn btn-secondary">View Progress</button>
            <div className="dropdown">
              {/* <button className="btn btn-success dropdown-toggle">Publish All</button> */}
            </div>
            {/* <button className="btn btn-danger">+ Module</button> */}
          </div>
          <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li
              key={module._id}
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
                {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
               onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                  dispatch(updateModule({ ...module, editing: false }));
                 }
               }}
               defaultValue={module.name}/>
      )}

                <ModuleControlButtons moduleId={module._id}
         deleteModule={(moduleId) => {
          dispatch(deleteModule(moduleId));
        }}
        editModule={(moduleId) => dispatch(editModule(moduleId))} />

              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li
                      key={lesson._id}
                      className="wd-lesson list-group-item p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.description}{" "}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
        </div>
        <div className="side-panel" >
          <h3>Course Status</h3>
          <div className="status-buttons">
            <button className="btn btn-secondary">Unpublish</button>
            <button className="btn btn-success">Publish</button>
          </div>
          <div className="side-actions">
            <button className="btn btn-light">Import Existing Content</button>
            <button className="btn btn-light">Import from Commons</button>
            <button className="btn btn-light">Choose Home Page</button>
            <button className="btn btn-light">View Course Stream</button>
            <button className="btn btn-light">New Announcement</button>
            <button className="btn btn-light">New Analytics</button>
            <button className="btn btn-light">View Course Notifications</button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Modules;