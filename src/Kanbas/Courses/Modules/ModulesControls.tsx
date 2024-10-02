import { FaPlus } from "react-icons/fa6";
import { FaEye, FaCompress } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap d-flex justify-content-between align-items-center">
      <div>
        <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-2">
          <FaCompress className="position-relative me-2" style={{ bottom: "1px" }} />
          Collapse All
        </button>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-2">
          <FaEye className="position-relative me-2" style={{ bottom: "1px" }} />
          View Progress
        </button>
      </div>
      <div>
        <div className="dropdown d-inline me-2">
          <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
            type="button" data-bs-toggle="dropdown">
            <GreenCheckmark />
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li>
              <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#publish-all">
                <GreenCheckmark />
                Publish all modules and items
              </a>
            </li>
            <li>
              <a id="wd-publish-modules-only-button" className="dropdown-item" href="#publish-modules">
                <GreenCheckmark />
                Publish modules only
              </a>
            </li>
            <li>
              <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#unpublish-all">
                Unpublish all modules and items
              </a>
            </li>
            <li>
              <a id="wd-unpublish-modules-only" className="dropdown-item" href="#unpublish-modules">
                Unpublish modules only
              </a>
            </li>
          </ul>
        </div>
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Module
        </button>
      </div>
    </div>
  );
}