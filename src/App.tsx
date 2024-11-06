import React from "react";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import Kanbas from "./Kanbas";
import Home from "./Kanbas/Courses/Home";
import Modules from "./Kanbas/Courses/Modules";
import Courses from "./Kanbas/Courses";


const defaultCourse = {
    _id: "1",
    name: "Front-End Developer Course",
    number: "CSE101",
    startDate: "2024-01-10",
    endDate: "2024-05-15",
    department: "Computer Science",
    credits: 4,
    description: "A comprehensive exploration of the React.js framework.",
};

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div>
                    <Routes>
                        <Route path="/" element={<Kanbas />}>
                            <Route index element={<Home course={defaultCourse} />} />
                            <Route path="courses" element={<Courses courses={[]} />} />
                            <Route path="/modules" element={<Modules />} />
                        </Route>
                    </Routes>
                </div>
            </Provider>
        </HashRouter>
    );
}
