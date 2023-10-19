/**
 * @author Jiyuan Wang
 */

import * as d3 from "d3";

export function vis3() {
  let svg, xScale, yScale, width, height, groupedData, colorScale;
  let currentIndex = 0;
  let isPlaying = false;
  let currentDate = "";

  colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  d3.csv("all_data.csv").then((data) => {
    const fiveStarCharacters = data.filter(
      (d) => d.Type == "2" && d.Star == "5"
    );
    const groupedMap = d3.group(
      fiveStarCharacters,
      (d) => d.Time,
      (d) => d.Name
    );

    groupedData = Array.from(groupedMap.entries(), ([time, nameData]) =>
      Array.from(nameData.entries(), ([name, values]) => ({
        Time: time,
        Name: name,
        Count: values.length,
      }))
    ).flat();

    groupedData.sort((a, b) =>
      a.Time > b.Time ? 1 : b.Time > a.Time ? -1 : 0
    );

    const allNames = [...new Set(groupedData.map((d) => d.Name))];
    colorScale.domain(allNames);
    let latestCumulativeCounts = {};
    allNames.forEach((name) => (latestCumulativeCounts[name] = 0));

    groupedData.forEach((d) => {
      if (!latestCumulativeCounts[d.Name]) {
        latestCumulativeCounts[d.Name] = 0;
      }
      latestCumulativeCounts[d.Name] += d.Count;
      d.CumulativeCount = latestCumulativeCounts[d.Name];
    });

    const allDates = [...new Set(groupedData.map((d) => d.Time))];
    let expandedData = [];
    allDates.forEach((date) => {
      allNames.forEach((name) => {
        const entry = groupedData.find(
          (d) => d.Time === date && d.Name === name
        );
        if (entry) {
          expandedData.push(entry);
        } else {
          const previousEntry = [...groupedData]
            .reverse()
            .find((d) => d.Time < date && d.Name === name);
          expandedData.push({
            Time: date,
            Name: name,
            CumulativeCount: previousEntry ? previousEntry.CumulativeCount : 0,
          });
        }
      });
    });
    groupedData = expandedData;

    const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    width = 800 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    svg = d3
      .select(".vis5")
      .select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    yScale = d3.scaleBand().domain(allNames).range([height, 0]).padding(0.1);
    xScale = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.CumulativeCount)])
      .range([0, width]);

    svg.append("g").call(d3.axisLeft(yScale));
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    const playButton = d3.select("#playButton");
    playButton.on("click", function () {
      if (isPlaying) {
        isPlaying = false;
        playButton.text("Play");
      } else {
        isPlaying = true;
        playButton.text("Pause");
        playData();
      }
    });
  });

  function playData() {
    if (!isPlaying || currentIndex >= groupedData.length) return;

    if (groupedData[currentIndex].Time !== currentDate) {
      currentDate = groupedData[currentIndex].Time;
      d3.select("#currentTime").text(currentDate);
    }

    const dataToShow = groupedData.filter((d) => d.Time === currentDate);

    dataToShow.sort((a, b) => a.CumulativeCount - b.CumulativeCount);

    updateChart(dataToShow);

    currentIndex++;
    setTimeout(playData, 10);
  }

  function updateChart(data) {
    const allNamesSorted = [...new Set(groupedData.map((d) => d.Name))].sort(
      (a, b) => {
        const aData = data.find((d) => d.Name === a) || { CumulativeCount: 0 };
        const bData = data.find((d) => d.Name === b) || { CumulativeCount: 0 };
        return aData.CumulativeCount - bData.CumulativeCount;
      }
    );
    yScale.domain(allNamesSorted);

    const bars = svg.selectAll("rect").data(data, (d) => d.Name);

    bars.exit().remove();

    bars
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.Name))
      .attr("y", (d) => yScale(d.Name))
      .merge(bars)
      .transition()
      .duration(50)
      .attr("width", (d) => xScale(d.CumulativeCount))
      .attr("y", (d) => yScale(d.Name));

    svg.selectAll("g").remove();
    svg.append("g").call(d3.axisLeft(yScale));
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  }
}
