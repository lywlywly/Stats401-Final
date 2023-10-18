"use client";
import * as React from "react";
import * as d3 from "d3";
import { GachaItem, regular } from "./page";

export const D3Graph = function (props: {
  allData: GachaItem[] | undefined;
}): React.JSX.Element {
  function drawChart() {
    const h = 4000;
    const w = 750;
    d3.select(".canvas-div").select("svg").remove();
    const svg = d3.select(".canvas-div").append("svg");
    svg.attr("width", w).attr("height", h);
    // console.log(allData.length);
    // if (allData.length == 1) return;
    const mapValueToColor = (value: number) => {
      if (value >= 80) return "hsl(0, 100%, 50%)";
      const hue = 120 - (3 * value) / 2;
      return `hsl(${hue}, 100%, 50%)`;
    };

    if (props.allData == undefined) return;
    svg
      .append("text")
      .attr("y", 20)
      .attr("x", 50)
      .style("fill", "#ff698d")
      .text(props.allData[props.allData.length - 1]?.time);

    svg
      .selectAll("rect")
      .data(props.allData)
      .enter()
      .append("rect")
      .attr("y", (d, i) => i * 60 + 30)
      .attr("x", (d, i) => 50)
      .attr("width", (d, i) => {
        return 7 * (d.draws ?? 0);
      })
      .attr("height", (d, i) => 15)
      .attr("fill", (d, i) => mapValueToColor(d.draws!))
      .append("title")
      .text((d, i) => `${d.draws}`);

    // svg
    //   .selectAll("text")
    //   .data(allData)
    //   .enter()
    //   .append("text")
    //   .attr("y", (d, i) => i * 60 + 14)
    //   .attr("x", (d, i) => 0)
    //   .style("fill", "#ff698d");
    // svg
    //   .selectAll("text")
    //   .data(props.allData)
    //   .enter()
    //   .append("text")
    //   .attr("y", (d, i) => i * 60 + 40)
    //   .attr("x", (d, i) => 1000)
    //   .style("fill", "#ff698d")
    //   .text((d, i) => {
    //     if (regular.includes(d.name)) return "歪";
    //     return "";
    //   });

    svg
      .selectAll("image")
      .data(props.allData)
      .enter()
      .append("image")
      .attr("y", (d, i) => i * 60 + 20)
      .attr("x", (d, i) => 0)
      .attr("width", 40)
      .attr("height", 40)
      .attr("href", (d, i) => `/assets/${d.en_name}.png`)
      .append("title")
      .text((d, i) => `${d.name} - ${d.time}`);
  }
  React.useEffect(() => {
    drawChart();
  }, [props.allData]);

  return (
    <div
      className="canvas-div"
      style={{ height: "450px", width: "max-content", overflowY: "scroll" }}
    >
      <svg style={{ width: "750" }}></svg>
    </div>
  );
};
