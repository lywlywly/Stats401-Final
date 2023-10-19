// 设置 SVG 容器的大小和边距
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// 创建 SVG 元素
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 定义 X 和 Y 轴的比例尺
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// 读取 CSV 数据
d3.csv("data01.csv").then(function(data) {
  // 解析数据并设置比例尺的域
  x.domain(d3.extent(data, function(d) { return +d.num_cnt; }));
  y.domain(d3.extent(data, function(d) { return +d.draw_cnt; }));

  // 添加 X 轴
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // 添加 Y 轴
  svg.append("g")
      .call(d3.axisLeft(y));

  // 添加散点图
  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.num_cnt); })
      .attr("cy", function(d) { return y(d.draw_cnt); })
      .style("fill", "#69b3a2");
});

window.addEventListener('unload', function () {
    document.documentElement.innerHTML = '';
});