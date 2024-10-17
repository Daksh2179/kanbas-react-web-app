import React from "react";

export function FindIndex() {
  let numberArray1 = [1, 2, 4, 5, 6];
  let stringArray1 = ['string1', 'string3'];

  const fourIndex = numberArray1.findIndex(a => a === 4);
  const string3Index = stringArray1.findIndex(a => a === 'string3');

  return { fourIndex, string3Index };
}

const ArrayIndexComponent = () => {
  const { fourIndex, string3Index } = FindIndex();

  return (
    <div id="wd-array-index">
      <h4>FindIndex Function</h4>
      <p>fourIndex : {fourIndex}</p>
      <p>string3Index : {string3Index}</p>
    </div>
  );
};

export default ArrayIndexComponent;
