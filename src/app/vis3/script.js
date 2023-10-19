/**
 * @author Peng Wang
 */

import * as d3 from "d3";

export function vis3(useStack) {
  const data = [
    {
      Time: "Sep-20",
      "Novice Pool": 2020,
      "Permanent Pool": 9129,
      "Character Pool": 9482,
      "Weapon Pool": 217,
    },
    {
      Time: "Oct-20",
      "Novice Pool": 2770,
      "Permanent Pool": 24015,
      "Character Pool": 28798,
      "Weapon Pool": 6906,
    },
    {
      Time: "Nov-20",
      "Novice Pool": 2990,
      "Permanent Pool": 28956,
      "Character Pool": 46356,
      "Weapon Pool": 13132,
    },
    {
      Time: "Dec-20",
      "Novice Pool": 3140,
      "Permanent Pool": 42911,
      "Character Pool": 71172,
      "Weapon Pool": 17801,
    },
    {
      Time: "Jan-21",
      "Novice Pool": 3250,
      "Permanent Pool": 48026,
      "Character Pool": 94206,
      "Weapon Pool": 22986,
    },
    {
      Time: "Feb-21",
      "Novice Pool": 3320,
      "Permanent Pool": 51347,
      "Character Pool": 110791,
      "Weapon Pool": 32911,
    },
    {
      Time: "Mar-21",
      "Novice Pool": 3330,
      "Permanent Pool": 52136,
      "Character Pool": 116957,
      "Weapon Pool": 34066,
    },
    {
      Time: "Apr-21",
      "Novice Pool": 3330,
      "Permanent Pool": 52259,
      "Character Pool": 117455,
      "Weapon Pool": 34516,
    },
    {
      Time: "May-21",
      "Novice Pool": 3330,
      "Permanent Pool": 52372,
      "Character Pool": 117965,
      "Weapon Pool": 34516,
    },
    {
      Time: "Jun-21",
      "Novice Pool": 3330,
      "Permanent Pool": 52388,
      "Character Pool": 118026,
      "Weapon Pool": 34518,
    },
  ];

  // set the dimensions and margins of the graph

  const margin = { top: 100, right: 30, bottom: 20, left: 20 },
    width = 545 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  d3.select(".vis3").select("svg").remove();
  const svg = d3
    .select(".vis3")
    .append("svg")
    .attr("width", 700)
    .attr("height", 525)
    .append("g")
    .attr("transform", "translate(50,75)");
  const background = svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "blue")
    .attr("fill-opacity", 0.0);
  // List of groups (Pools)
  const keys = [
    "Novice Pool",
    "Permanent Pool",
    "Character Pool",
    "Weapon Pool",
  ];

  // Add X axis (YearMonth values)
  const x = d3
    .scaleBand(
      data.map((d) => d.Time),
      [0, width]
    )
    .paddingInner(1);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Stack the data
  const stackedData = d3.stack().keys(keys)(data);
  console.log(stackedData);

  // Add Y axis based on our data's range
  let max_value;
  if (useStack) {
    max_value = 1.1 * stackedData.at(-1).at(-1)[1];
  } else {
    max_value = 1.15 * d3.max(data, (d) => d3.max(keys, (key) => d[key]));
  }

  const y = d3.scaleLinear().domain([0, max_value]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // color palette
  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10); // Use a color scheme with enough distinct colors

  if (useStack) {
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .join("path")
      .style("fill", (d) => color(d.key))
      .attr(
        "d",
        d3
          .area()
          // .x((d, i) => x(i))
          .x((d, i) => x(data[i].Time))
          .y0((d) => y(d[0]))
          .y1((d) => y(d[1]))
      );
  } else {
    keys.forEach((key) => {
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", (d) => color(key))
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x((d) => x(d.Time))
            .y((d) => y(d[key]))
        );
    });
  }

  console.log(svg);

  const mouse_g = svg
    .append("g")
    .classed("mouse", true)
    .style("display", "none");
  mouse_g
    .append("rect")
    .attr("width", 2)
    .attr("x", -1)
    .attr("height", height)
    .attr("fill", "lightgray");
  mouse_g.append("g").classed("tooltip", true);

  svg.on("click", (e) => {
    console.log(e);
    mouse_g.style("display", "block");
    mouse_g.select(".tooltip").selectAll("*").remove();
    const [x_cord, y_cord] = d3.pointer(e);
    const ratio = x_cord / width;
    let idx = Math.round((data.length - 1) * ratio);
    let interestedData = data[idx];
    console.log((data.length - 1) * ratio);
    Object.keys(interestedData).forEach((key, i) =>
      mouse_g
        .select(".tooltip")
        .append("text")
        .attr("x", 20)
        .attr("y", i * 15 + 10)
        .style("font-size", "12px")
        .text(`${key}: ${interestedData[key]}`)
    );
    mouse_g.select("rect").attr("x", x(data[idx].Time));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") mouse_g.style("display", "none");
  });

  // legend

  const legendRectSize = 18;
  const legendSpacing = 4;

  const legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => {
      const height = legendRectSize + legendSpacing;
      const offset = (height * color.domain().length) / 2;
      const horz = width + 40;
      const vert = i * height - offset;
      return `translate(${horz}, ${vert})`;
    });

  legend
    .append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .style("fill", color)
    .style("stroke", color);

  legend
    .append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .text((d) => d)
    .style("font-size", "12px");
}
