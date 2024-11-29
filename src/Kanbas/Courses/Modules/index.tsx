import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { RootState } from "../../store";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { modules as modulesData } from "../../Database/index";
import "./style.css";

const Modules: React.FC = () => {
    const { cid } = useParams<{ cid: string }>(); // Course ID from route params
    const [moduleName, setModuleName] = useState("");
    const [showCheckmark, setShowCheckmark] = useState(false);
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

    // Show GreenCheckmark temporarily
    const triggerCheckmark = () => {
        setShowCheckmark(true);
        setTimeout(() => setShowCheckmark(false), 2000);
    };

    return (
        <div className="modules-page">
            <div className="controls-section">
                <ModulesControls
                    setModuleName={setModuleName}
                    moduleName={moduleName}
                    addModule={() => {
                        if (!moduleName.trim()) return; // Prevent adding empty modules
                        dispatch(addModule({ name: moduleName, course: cid }));
                        setModuleName("");
                        triggerCheckmark();
                    }}
                />
                <button className="btn btn-secondary">Collapse All</button>
                <button className="btn btn-secondary">View Progress</button>
            </div>

            <div className="layout-container">
                {/* Modules */}
                <div className="modules-content">
                    {modules.length === 0 ? (
                        <p>No modules available. Add a new module to get started!</p>
                    ) : (
                        <ul id="wd-modules">
                            {modules
                                .filter((module: any) => module.course === cid)
                                .map((module: any) => (
                                    <li key={module._id} className="wd-module">
                                        <div className="wd-title">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {module.name}
                                            {module.editing && (
                                                <input
                                                    className="form-control w-50 d-inline-block"
                                                    onChange={(e) =>
                                                        dispatch(
                                                            updateModule({
                                                                ...module,
                                                                name: e.target.value,
                                                            })
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            dispatch(
                                                                updateModule({
                                                                    ...module,
                                                                    editing: false,
                                                                })
                                                            );
                                                            triggerCheckmark();
                                                        }
                                                    }}
                                                    defaultValue={module.name}
                                                />
                                            )}
                                            <ModuleControlButtons
                                                moduleId={module._id}
                                                deleteModule={(moduleId) =>
                                                    dispatch(deleteModule(moduleId))
                                                }
                                                editModule={(moduleId) =>
                                                    dispatch(editModule(moduleId))
                                                }
                                            />
                                        </div>
                                        {module.lessons && (
                                            <ul className="wd-lessons">
                                                {module.lessons.map((lesson: any) => (
                                                    <li
                                                        key={lesson._id}
                                                        className="wd-lesson"
                                                    >
                                                        <BsGripVertical className="me-2 fs-3" />
                                                        {lesson.description}
                                                        <LessonControlButtons />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                {/* Side Panel */}
                <div className="side-panel">
                    <h3>Course Status</h3>
                    <div className="status-buttons">
                        <button className="btn btn-warning">Unpublish</button>
                        <button className="btn btn-success">Publish</button>
                    </div>
                    <div className="side-actions">
                        <button className="btn btn-outline-primary">
                            Import Existing Content
                        </button>
                        <button className="btn btn-outline-primary">
                            Import from Commons
                        </button>
                        <button className="btn btn-outline-primary">
                            Choose Home Page
                        </button>
                        <button className="btn btn-outline-primary">
                            View Course Stream
                        </button>
                        <button className="btn btn-outline-primary">
                            New Announcement
                        </button>
                        <button className="btn btn-outline-primary">New Analytics</button>
                        <button className="btn btn-outline-primary">
                            View Course Notifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modules;
