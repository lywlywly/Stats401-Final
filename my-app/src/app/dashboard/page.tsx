"use client";

import * as React from "react";
import * as d3 from "d3";
import GachaRacord from "@/app/gacha_record/page";
import Network from "@/app/network/page";
import Vis5 from "@/app/vis5/page";
import Vis1 from "@/app/vis1/page";
import "./styles.css";

const Chart: React.FunctionComponent = () => {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Vis1></Vis1>
      </div>
      <div className="grid-item">
        <GachaRacord></GachaRacord>
      </div>
      <div className="grid-item" style={{ minWidth: "850px" }}>
        <Vis5></Vis5>
      </div>
      <div className="grid-item">
        <Network></Network>
      </div>
    </div>
  );
};

export default Chart;
