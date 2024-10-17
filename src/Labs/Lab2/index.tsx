import React from 'react';
import "./index.css";
import BackgroundColors from './BackgroundColors';
import Dimensions from './Dimensions';
import Flex from './Flex';
import Float from './Float';
import ForegroundColors from './ForegroundColors';
import GridLayout from './GridLayout';
import Margins from './Margins';
import Padding from './Padding';
import Positions from './Positions';
import ReactIconsSampler from './ReactIcons';
import Zindex from './Zindex';
import Corners from './Corners';
import Borders from './Borders';

export default function Lab2() {
  return (
    <div>
      <div className="container">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the
          elements of the same name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
        <div id="wd-css-document-structure">
          <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
              Selectors can be combined to refer elements in particular
              places in the document
              <p className="wd-selector-3">
                This paragraph's red background is referenced as
                <br />
                .selector-2 .selector3<br />
                meaning the descendant of some ancestor.<br />
                <span className="wd-selector-4">
                  Whereas this span is a direct child of its parent
                </span><br />
                You can combine these relationships to create specific
                styles depending on the document structure
              </p>
            </div>
            <BackgroundColors />
            <Borders />
            <Corners />
            <Dimensions />
            <Flex />
            <Float />
            <ForegroundColors />
            <GridLayout />
            <Margins />
            <Padding />
            <Positions />
            <Zindex />
            <ReactIconsSampler />


          </div>
        </div>
      </div>
    </div>
  );
}
