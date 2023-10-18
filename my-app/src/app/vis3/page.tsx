"use client";

import * as React from "react";
import * as Vis3 from "./script";
import "./styles.css";
const Chart: React.FunctionComponent = () => {
  const [useStack, setUseStack] = React.useState<boolean>(true);
  React.useEffect(() => {
    Vis3.vis3(useStack);
  }, [useStack]);

  return (
    <div className="vis3">
      <div>
        Stack
        <label className="switch">
          <input
            type="checkbox"
            checked={useStack}
            onChange={(e) => {
              setUseStack(!useStack);
            }}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
      <svg></svg>
    </div>
  );
};

export default Chart;
