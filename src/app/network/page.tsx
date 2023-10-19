"use client";

import * as React from "react";
import * as network from "./network";

const Chart: React.FunctionComponent = () => {
  React.useEffect(() => {
    network.network();
  });

  return (
    <div className="network">
      <svg></svg>{" "}
      <div
        id="tooltip"
        style={{
          position: "absolute",
          width: "300px",
          border: "1px solid rgba(0, 0, 0, 0.8)",
          borderRadius: "5px",
          visibility: "hidden",
        }}
      >
        <img></img>
        {/* <p></p> */}
      </div>
      <div className="cla"></div>
    </div>
  );
};

export default Chart;
