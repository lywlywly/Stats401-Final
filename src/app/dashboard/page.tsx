"use client";

import * as React from "react";
import * as d3 from "d3";
import GachaRacord from "@/app/gacha_record/page";
import Network from "@/app/network/page";
import Vis5 from "@/app/vis5/page";
import Vis3 from "@/app/vis3/page";
import Vis1 from "@/app/vis1/page";
import "./styles.css";

const Chart: React.FunctionComponent = () => {
  return (
    <div className="parent">
      <div className="grid-item div1" style={{ minWidth: "720px" }}>
        <Vis1></Vis1>
      </div>
      <div className="grid-item div2">
        <Network></Network>
      </div>
      <div className="grid-item div3" style={{ minWidth: "800px" }}>
        <GachaRacord></GachaRacord>
      </div>
      <div className="grid-item div4" style={{ minWidth: "850px" }}>
        <Vis5></Vis5>
      </div>
      <div className="grid-item div5" style={{ minWidth: "800px" }}>
        <Vis3></Vis3>
      </div>
    </div>
  );
};

export default Chart;
