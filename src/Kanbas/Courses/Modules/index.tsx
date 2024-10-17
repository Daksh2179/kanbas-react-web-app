import React from "react";
import { BsGripVertical } from "react-icons/bs";
import { modules } from "../../Database"; // Import modules directly from the Database
import ModulesControls from "./ModulesControls";
import './style.css';
import LessControlButtons from "./LessControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
}

interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  // Add any other properties that the course object might have
}

interface ModulesProps {
  course: Course;
}

export default function Modules({ course }: ModulesProps) {
  return (
    <div>
      <h2>Modules for {course.name}</h2>
      <ModulesControls /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: Module) => module.course === course._id)
          .map((module: Module) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessControlButtons />
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