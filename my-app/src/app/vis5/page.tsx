"use client";

import * as React from "react";
import * as vis3 from "./script";
import "./styles.css";

const Chart: React.FunctionComponent = () => {
  React.useEffect(() => {
    vis3.vis3();
  });

  return (
    <div className="container">
      <button id="playButton">Play</button>
      <text id="currentTime" x="850" y="30"></text>
      <svg id="chart"></svg>
    </div>
  );
};

export default Chart;
