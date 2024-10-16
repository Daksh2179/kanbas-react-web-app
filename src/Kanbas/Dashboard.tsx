import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {/* Course 1: React JS */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/reactjs.webp" alt="React JS" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Front-end developer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 2: Web Development */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5610/Home">
                <img src="/images/webdev.jpg" alt="Web Development" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5610 Web Development
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 3: Game Development */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5717/Home">
                <img src="/images/gaming.jpg" alt="Game Development" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5717 Game Development
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Game Developer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 4: Cloud Computing */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5801/Home">
                <img src="/images/cloud.jpg" alt="Cloud Computing" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5801 Cloud Computing
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Cloud Solutions Architect
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 5: Programming Design Paradigm */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5010/Home">
                <img src="/images/pdplogo.png" alt="Programming Design Paradigm" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5010 Programming Design Paradigm
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Object Oriented Programmer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 6: ai */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5890/Home">
                <img src="/images/ai.jpg" alt="artificial intelligence" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5890 Artificial Intelligence
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    AI prompt engineer/Ai engineer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Course 7: ml */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5900/Home">
                <img src="/images/ml.jpg" alt="Machine Learning" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5900 Machine Learning
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Data Scientist / ML Engineer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/6150/Home">
                <img src="/images/mobile.jpg" alt="Mobile Development" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS6150 App Development
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    iOS and Android Developer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}