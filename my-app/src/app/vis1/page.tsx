"use client";

import * as React from "react";
import * as vis1 from "./script";
import "./styles.css";
import * as d3 from "d3";

const Chart: React.FunctionComponent = () => {
  const [radius, setRadius] = React.useState<number>(2);

  React.useEffect(() => {
    vis1.vis1(radius);
    // return () => {
    //   d3.select("#chart-1").remove();
    // };
  }, [radius]);
  return (
    <div>
      <input
        type="range"
        onChange={(e) => {
          setRadius(parseInt(e.target.value) / 50);
        }}
      ></input>
      <div>
        <svg id="chart-1"></svg>
      </div>
    </div>
  );
};

export default Chart;
