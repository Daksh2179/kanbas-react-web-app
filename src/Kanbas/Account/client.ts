import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  try {
    console.log('Signin URL:', `${USERS_API}/signin`);
    console.log('Credentials:', credentials);
    
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    console.log('Full response:', response);
    
    return response.data;
  } catch (error: any) {
    console.error('Signin Error Details:', {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};


export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const setCourses = async (courses: any[]) => ({
  type: 'SET_COURSES',
  payload: courses,
});

export const fetchCourses = async (userId: string) => {
  return (dispatch: any) => {
    fetch(`/api/users/${userId}/courses`)
      .then((response) => response.json())
      .then((data) => dispatch(setCourses(data))) // Dispatch action to set courses
      .catch((error) => console.error('Error fetching courses:', error));
  };
};