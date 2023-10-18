"use client";

import * as React from "react";
import * as Vis3 from "./script";

const Chart: React.FunctionComponent = () => {
  React.useEffect(() => {
    Vis3.vis3();
  });

  return (
    <div className="vis3">
      <svg></svg>
    </div>
  );
};

export default Chart;
