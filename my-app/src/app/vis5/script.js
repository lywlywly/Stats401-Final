/**
 * @author Jiyuan Wang
 */

import * as d3 from "d3";

export function vis3() {
  // 初始化全局变量
  let svg, xScale, yScale, width, height, groupedData;
  let currentIndex = 0;
  let isPlaying = false;
  let currentDate = "";

  d3.csv("all_data.csv").then((data) => {
    // 过滤出5星角色并按日期和名称进行分组
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
    let latestCumulativeCounts = {};
    allNames.forEach((name) => (latestCumulativeCounts[name] = 0));

    groupedData.forEach((d) => {
      if (!latestCumulativeCounts[d.Name]) {
        latestCumulativeCounts[d.Name] = 0;
      }
      latestCumulativeCounts[d.Name] += d.Count; // 累加数量
      d.CumulativeCount = latestCumulativeCounts[d.Name]; // 保存到当前数据点的累积数量
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

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    width = 800 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;

    svg = d3
      .select("#chart")
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

    // 检查日期是否变化
    if (groupedData[currentIndex].Time !== currentDate) {
      currentDate = groupedData[currentIndex].Time;
      d3.select("#currentTime").text(currentDate);
    }

    const dataToShow = groupedData.filter((d) => d.Time === currentDate);

    updateChart(dataToShow);

    currentIndex++;
    setTimeout(playData, 10); // 这里我继续使用了250毫秒的更新频率，您可以根据需要进行调整
  }

  function updateChart(data) {
    svg.selectAll("rect").remove();

    svg
      .selectAll("rect")
      .data(data, (d) => d.Name)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(d.Name))
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d.CumulativeCount))
      .attr("fill", "#007BFF");
  }
}
