"use client";

import * as React from "react";
import * as network from "./network";

const Chart: React.FunctionComponent = () => {
  React.useEffect(() => {
    network.network();
  });

  return <div></div>;
};

export default Chart;
