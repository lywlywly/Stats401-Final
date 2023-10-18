"use client";

import * as React from "react";
import * as vis1 from "./script";
import "./styles.css";
import * as d3 from "d3";

const Chart: React.FunctionComponent = () => {
  React.useEffect(() => {
    vis1.vis1();
    return () => {
      d3.select("#chart-1").remove();
    };
  }, []);
  return <svg id="chart-1"></svg>;
};

export default Chart;
