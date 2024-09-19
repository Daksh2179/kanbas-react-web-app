import React from 'react';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h2>Course 1234</h2>
      <h3>Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application 
        running on Netlify. The landing page should include the following: Your full name and section 
        Links to each of the lab assignments Link to the Kanbas application Links to all relevant 
        source code repositories The Kanbas application should include a link to navigate back to the 
        landing page.
      </textarea>
      <br /><br />
      <div>
        <label htmlFor="wd-points">Points</label>
        <input id="wd-points" type="text" value="100" />
      </div>
      <div>
        <label htmlFor="wd-assignment-group">Assignment Group</label>
        <select id="wd-assignment-group">
          <option>ASSIGNMENTS</option>
        </select>
      </div>
      <div>
        <label htmlFor="wd-grade-display">Display Grade as</label>
        <select id="wd-grade-display">
          <option>Percentage</option>
        </select>
      </div>
      <div>
        <label htmlFor="wd-submission-type">Submission Type</label>
        <select id="wd-submission-type">
          <option>Online</option>
        </select>
      </div>
      <div>
        <h4>Online Entry Options</h4>
        <div>
          <input type="checkbox" id="wd-text-entry" />
          <label htmlFor="wd-text-entry">Text Entry</label>
        </div>
        <div>
          <input type="checkbox" id="wd-website-url" />
          <label htmlFor="wd-website-url">Website URL</label>
        </div>
        <div>
          <input type="checkbox" id="wd-media-recordings" />
          <label htmlFor="wd-media-recordings">Media Recordings</label>
        </div>
        <div>
          <input type="checkbox" id="wd-student-annotation" />
          <label htmlFor="wd-student-annotation">Student Annotation</label>
        </div>
        <div>
          <input type="checkbox" id="wd-file-uploads" />
          <label htmlFor="wd-file-uploads">File Uploads</label>
        </div>
      </div>
      <div>
        <label htmlFor="wd-assign-to">Assign Assign to</label>
        <input id="wd-assign-to" type="text" value="Everyone" />
      </div>
      <div>
        <label htmlFor="wd-due-date">Due</label>
        <input id="wd-due-date" type="date" value="2024-05-13" />
      </div>
      <div>
        <label htmlFor="wd-available-from">Available from</label>
        <input id="wd-available-from" type="date" value="2024-05-06" />
      </div>
      <div>
        <label htmlFor="wd-until">Until</label>
        <input id="wd-until" type="date" value="2024-05-20" />
      </div>
      <div>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}