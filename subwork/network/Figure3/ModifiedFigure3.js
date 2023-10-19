const data = [
    {"Time": "Sep-20", "Novice Pool": 2020, "Permanent Pool": 9129, "Character Pool": 9482, "Weapon Pool": 217},
    {"Time": "Oct-20", "Novice Pool": 2770, "Permanent Pool": 24015, "Character Pool": 28798, "Weapon Pool": 6906},
    {"Time": "Nov-20", "Novice Pool": 2990, "Permanent Pool": 28956, "Character Pool": 46356, "Weapon Pool": 13132},
    {"Time": "Dec-20", "Novice Pool": 3140, "Permanent Pool": 42911, "Character Pool": 71172, "Weapon Pool": 17801},
    {"Time": "Jan-21", "Novice Pool": 3250, "Permanent Pool": 48026, "Character Pool": 94206, "Weapon Pool": 22986},
    {"Time": "Feb-21", "Novice Pool": 3320, "Permanent Pool": 51347, "Character Pool": 110791, "Weapon Pool": 32911},
    {"Time": "Mar-21", "Novice Pool": 3330, "Permanent Pool": 52136, "Character Pool": 116957, "Weapon Pool": 34066},
    {"Time": "Apr-21", "Novice Pool": 3330, "Permanent Pool": 52259, "Character Pool": 117455, "Weapon Pool": 34516},
    {"Time": "May-21", "Novice Pool": 3330, "Permanent Pool": 52372, "Character Pool": 117965, "Weapon Pool": 34516},
    {"Time": "Jun-21", "Novice Pool": 3330, "Permanent Pool": 52388, "Character Pool": 118026, "Weapon Pool": 34518}
];



// set the dimensions and margins of the graph


const margin = {top:  100, right: 30, bottom: 30, left: 60},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
// const svg = d3.select("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

var svg = d3.select("body")
    .append("svg")
    .attr("width", 800)
    .attr("height", 800)
    .append("g")
    .attr("transform", "translate(50,300)"); 




// List of groups (Pools)
const keys = ["Novice Pool", "Permanent Pool", "Character Pool", "Weapon Pool"];

// Add X axis (YearMonth values)
const x = d3.scaleBand()
    .domain(data.map(d => d.Time)) // Use the index as a representation of YearMonth
    .range([0, width]);
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

// Add Y axis based on our data's range
const max_value = d3.max(data, d => d3.max(keys, key => d[key]));

const y = d3.scaleLinear()
    .domain([0, max_value])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// color palette
const color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeCategory10); // Use a color scheme with enough distinct colors

// Stack the data
const stackedData = d3.stack()
    .keys(keys)
    (data);

// console.log(stackedData);
// Show the areas
svg
    .selectAll("mylayers")
    .data(stackedData)
    .join("path")
      .style("fill", d => color(d.key))
      .attr("d", d3.area()
        // .x((d, i) => x(i))
        .x((d, i) => x(data[i].Time))


        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
    );
 




    // legend

const legendRectSize = 18;
const legendSpacing = 4

const legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
        const height = legendRectSize + legendSpacing;
        const offset = height * color.domain().length / 2;
        const horz = width + 40; 
        const vert = i * height - offset;
        return `translate(${horz}, ${vert})`;
    });


legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);


legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(d => d);
