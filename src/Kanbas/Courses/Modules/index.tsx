import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import GreenCheckmark from "./GreenCheckmark";
import { RootState } from "../../store";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { modules as modulesData } from "../../Database/index";

// Main Modules component
const Modules: React.FC = () => {
  const { cid } = useParams<{ cid: string }>(); // Course ID from route params
  const [moduleName, setModuleName] = useState("");
  const [showCheckmark, setShowCheckmark] = useState(false); // State for GreenCheckmark visibility
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  // Load initial modules data if Redux store is empty
  useEffect(() => {
    if (modules.length === 0) {
      modulesData
        .filter((module) => module.course === cid)
        .forEach((module) => dispatch(addModule(module)));
    }
  }, [cid, dispatch, modules.length]);

  // Function to show GreenCheckmark temporarily
  const triggerCheckmark = () => {
    setShowCheckmark(true);
    setTimeout(() => setShowCheckmark(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="modules-container">
      <div className="content-wrapper">
        <div className="main-content">
          {/* Module Controls Section */}
          <div className="modules-controls">
            <ModulesControls
              setModuleName={setModuleName}
              moduleName={moduleName}
              addModule={() => {
                dispatch(addModule({ name: moduleName, course: cid }));
                setModuleName("");
                triggerCheckmark(); // Show checkmark after adding a module
              }}
            />
            <button className="btn btn-secondary">Collapse All</button>
            <button className="btn btn-secondary">View Progress</button>
          </div>

          {/* Show GreenCheckmark if triggered */}
          {showCheckmark && <GreenCheckmark />}

          {/* Modules List */}
          <ul id="wd-modules" className="list-group rounded-0">
            {modules
              .filter((module: any) => module.course === cid)
              .map((module: any) => (
                <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                  <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
                    {!module.editing && module.name}
                    
                    {/* Inline Module Edit Input */}
                    {module.editing && (
                      <input
                        className="form-control w-50 d-inline-block"
                        onChange={(e) =>
                          dispatch(updateModule({ ...module, name: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(updateModule({ ...module, editing: false }));
                            triggerCheckmark(); // Show checkmark after updating a module
                          }
                        }}
                        defaultValue={module.name}
                      />
                    )}
                    
                    {/* Control Buttons for Modules */}
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  </div>

                  {/* Lesson List within each Module */}
                  {module.lessons && (
                    <ul className="wd-lessons list-group rounded-0">
                      {module.lessons.map((lesson: any) => (
                        <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
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

        {/* Side Panel */}
        <div className="side-panel">
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
};

export default Modules;