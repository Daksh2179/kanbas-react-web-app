import React from 'react';

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

interface HomeProps {
  course: Course;
}

export default function Home({ course }: HomeProps) {
  return (
    <div className="container-fluid px-0">
      <h2>{course.name} - Home</h2>
      <div className="row mt-4">
        <div className="col-md-8">
          <p>{course.description || "This Front-End Developer Course offers a comprehensive exploration of the React.js framework and modern web development techniques. Participants will delve into the essential concepts of React, including component-based architecture, state management, and lifecycle methods. The curriculum covers advanced topics such as hooks, context API, and routing, building responsive and accessible user interfaces."}</p>
          <h3>Course Details</h3>
          <ul>
            <li>Department: {course.department}</li>
            <li>Credits: {course.credits}</li>
            <li>Start Date: {course.startDate}</li>
            <li>End Date: {course.endDate}</li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Course Status: {course.name}</h5>
              <div className="d-flex justify-content-between mb-2">
                <button className="btn btn-secondary">Unpublish</button>
                <button className="btn btn-success">Publish</button>
              </div>
              <button className="btn btn-secondary w-100 mb-2">Import Existing Content</button>
              <button className="btn btn-secondary w-100 mb-2">Import from Commons</button>
              <button className="btn btn-secondary w-100">Choose Home Page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}