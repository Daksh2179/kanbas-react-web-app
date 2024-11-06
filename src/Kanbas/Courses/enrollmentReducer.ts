import { Enrollment, User } from '../Database';
import { ENROLL, UNENROLL } from './enrollmentActions';

interface EnrollmentState {
  users: User[];
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
    enrollments: [],
    users: []
};

const enrollmentReducer = (state = initialState, action: any): EnrollmentState => {
  switch (action.type) {
    case ENROLL:
      return {
        ...state,
        enrollments: [...state.enrollments, {
            user: action.payload.userId, course: action.payload.courseId,
            _id: ''
        }],
      };
    case UNENROLL:
      return {
        ...state,
        enrollments: state.enrollments.filter((e) => !(e.user === action.payload.userId && e.course === action.payload.courseId)),
      };
    default:
      return state;
  }
};

export default enrollmentReducer;
