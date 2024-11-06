import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';
import { Course, assignments, Assignment, RootState } from '../../Database';
import './style.css';

const AssignmentEditor: React.FC = () => {
  const { courseId, aid } = useParams<{ courseId: string; aid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditMode = !!aid;

  const course = useSelector((state: RootState) => 
    state.courses.courses.find((c: Course) => c._id === courseId)
  );

  const [assignment, setAssignment] = useState<Assignment>({
    id: '',
    name: '',
    description: '',
    points: 0,
    group: 'ASSIGNMENTS',
    gradeDisplay: 'Percentage',
    submissionType: 'Online',
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    course: courseId || '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    dueDate?: string;
    points?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (isEditMode && aid) {
      const existingAssignment = assignments.find((a) => a.id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          general: 'Assignment not found',
        }));
      }
    }
  }, [aid, isEditMode]);

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!assignment.name.trim()) {
      errors.name = 'Assignment name is required';
    }

    if (!assignment.dueDate) {
      errors.dueDate = 'Due date is required';
    }

    if (assignment.points < 0) {
      errors.points = 'Points must be greater than or equal to 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: name === 'points' ? Number(value) : value,
    }));
    
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditMode) {
        dispatch(updateAssignment(assignment));
      } else {
        dispatch(addAssignment({ ...assignment, id: crypto.randomUUID() }));
      }
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    } catch (error) {
      setValidationErrors((prev) => ({
        ...prev,
        general: 'Failed to save assignment. Please try again.',
      }));
    }
  };

  if (!courseId) {
    return (
      <div className="wd-assignments">
        <div className="alert alert-danger">
          Course ID is required to create or edit an assignment
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="wd-assignments">
        <div className="alert alert-danger">
          Course not found
        </div>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="wd-assignments">
      {validationErrors.general && (
        <div className="alert alert-danger">{validationErrors.general}</div>
      )}
      
      <div className="wd-assignments-header">
        <h2>
          {course.name} {'>'} Assignments {'>'} {assignment.name || 'New Assignment'}
        </h2>
        <div className="wd-button-group">
          <Link 
            to={`/Kanbas/Courses/${courseId}/Assignments`} 
            className="btn btn-outline-secondary"
          >
            <FaTimes /> Cancel
          </Link>
        </div>
      </div>

      <div className="wd-assignments-content">
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control wd-search-input ${validationErrors.name ? 'is-invalid' : ''}`}
                value={assignment.name}
                onChange={handleInputChange}
                required
              />
              {validationErrors.name && (
                <div className="invalid-feedback">{validationErrors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows={3}
                value={assignment.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                Points
              </label>
              <input
                type="number"
                id="points"
                name="points"
                className={`form-control ${validationErrors.points ? 'is-invalid' : ''}`}
                value={assignment.points}
                onChange={handleInputChange}
                min="0"
                required
              />
              {validationErrors.points && (
                <div className="invalid-feedback">{validationErrors.points}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date <FaCalendarAlt className="wd-search-icon" />
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                className={`form-control ${validationErrors.dueDate ? 'is-invalid' : ''}`}
                value={assignment.dueDate}
                onChange={handleInputChange}
                required
              />
              {validationErrors.dueDate && (
                <div className="invalid-feedback">{validationErrors.dueDate}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="availableFrom" className="form-label">
                Available From <FaCalendarAlt className="wd-search-icon" />
              </label>
              <input
                type="datetime-local"
                id="availableFrom"
                name="availableFrom"
                className="form-control"
                value={assignment.availableFrom}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="availableUntil" className="form-label">
                Available Until <FaCalendarAlt className="wd-search-icon" />
              </label>
              <input
                type="datetime-local"
                id="availableUntil"
                name="availableUntil"
                className="form-control"
                value={assignment.availableUntil}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="group" className="form-label">
                Assignment Group
              </label>
              <select
                id="group"
                name="group"
                className="form-control"
                value={assignment.group}
                onChange={handleInputChange}
              >
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECTS">Projects</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="submissionType" className="form-label">
                Submission Type
              </label>
              <select
                id="submissionType"
                name="submissionType"
                className="form-control"
                value={assignment.submissionType}
                onChange={handleInputChange}
              >
                <option value="Online">Online</option>
                <option value="Paper">Paper</option>
                <option value="External">External Tool</option>
              </select>
            </div>

            <button 
              className="btn btn-danger"
              onClick={handleSave}
            >
              {isEditMode ? 'Update Assignment' : 'Create Assignment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEditor;