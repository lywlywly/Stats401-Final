/**
 * @author Jiyuan Wang
 */

import * as d3 from "d3";

export function vis1(radius) {
  console.log(radius);
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  d3.select("#chart-1").select("g").remove();

  var svg = d3
    .select("#chart-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // define scale for x, and y axis
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  let zoom = d3.zoom().on("zoom", handleZoom);

  function handleZoom(e) {
    d3.select("#chart-1 g").attr("transform", e.transform);
    // draw();
  }

  function initZoom() {
    d3.select("#chart-1").call(zoom);
  }

  function draw() {
    d3.csv("overall_results.csv").then((data) => {
      // axis domain
      x.domain([0, 270]);
      y.domain([0, 120]);

      // x axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(30));

      // y axis
      svg.append("g").call(d3.axisLeft(y).ticks(24));

      svg
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("cx", (d) => x(d.num_cnt))
        .attr("cy", (d) => y(d.draw_cnt))
        .attr(
          "onclick",
          (d) =>
            `window.open('large_file/player_data/${d.filename}', '_blank');`
        )
        .style("fill", "#69b3a2")
        .append("title")
        .text(
          (d, i) =>
            `average ${Number(d.draw_cnt).toFixed(2)} polls to have ${
              d.num_cnt
            } 5-tier items`
        );
    });
  }
  initZoom();
  draw();
}
