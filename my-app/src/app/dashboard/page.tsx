"use client";

import * as React from "react";
import * as d3 from "d3";
import GachaRacord from "@/app/gacha_record/page";
import Network from "@/app/network/page";
import Vis5 from "@/app/vis5/page";

const Chart: React.FunctionComponent = () => {
  return (
    <div>
      <GachaRacord></GachaRacord>
      <Network></Network>
      <Vis5></Vis5>
    </div>
  );
};

export default Chart;
