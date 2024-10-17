import React from 'react';
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

interface CourseStatusProps {
  course: {
    _id: string;
    name: string;
    // Add other course properties as needed
  };
}

export default function CourseStatus({ course }: CourseStatusProps) {
  return (
    <div id="wd-course-status" className="bg-light p-3 rounded" style={{ width: "300px" }}>
      <h2 className="mb-3">Course Status: {course.name}</h2>
      <div className="d-flex mb-3">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </button>
        </div>
        <div className="w-50 ps-1">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </button>
        </div>
      </div>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </button>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <BsEye className="me-2 fs-5" /> View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <MdOutlineAddCircleOutline className="me-2 fs-5" /> New Announcement
      </button>
      <button className="btn btn-lg btn-secondary w-100 mb-2 text-start">
        <IoAnalyticsOutline className="me-2 fs-5" /> New Analytics
      </button>
      <button className="btn btn-lg btn-secondary w-100 text-start">
        <IoNotificationsOutline className="me-2 fs-5" /> View Course Notifications
      </button>
    </div>
  );
}