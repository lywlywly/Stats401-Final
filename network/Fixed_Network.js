const svg = d3.select("svg");

const width = 800;
const height = 600;

let processedData; // Variable to store processed data
let nodes = [];  
let links = []; 
d3.csv("page_1.csv", function(d){
    // console.log("Raw data:", d);
    return{
        name: d.Name,
        weight: Number(d.Number)
    };
}).then(function(data) {
    processedData = data; // Assign the processed data to the variable
    // console.log("Processed data:", processedData);
    const json = JSON.stringify(data, null, 2); // The "2" argument formats the output with 2-space indentation
    // console.log(json);

    const rows  = json.trim().split("\n").slice(1);
    // const nodes = [];
    // const links = [];
    rows.forEach(row=>{
        const [nameStr, weightStr] = row.split(",");
    
    // Removing unwanted characters to get a clean array of names
    const names = nameStr
        .replace(/[\[\]"\s+]/g, '') // Remove square brackets, quotes, and spaces
        .split(','); // Split by comma to get the list of names
    
    const weight = parseInt(weightStr, 10);

    // Add nodes if they don't exist
    names.forEach(name => {
        if (!nodes.find(n => n.id === name)) {
            nodes.push({ id: name });
        }
    });

    // Create links between every two nodes in the list
    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            links.push({
                source: names[i],
                target: names[j],
                weight: weight
            });
        }
    }

    
    })

});
const graph = { nodes: nodes, links: links };


const simulation = d3.forceSimulation(graph.nodes)
    .force('link', d3.forceLink(graph.links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2));

const link = svg.append('g')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
    .style('stroke', '#aaa');

const node = svg.append('g')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
    .attr('r', 8)
    .style('fill', "#3498db")
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

node.append('title')
    .text(d => d.id);

simulation.on('tick', () => {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
});

function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}
// Add link labels
const linkLabels = svg.append("g")
    .attr("class", "link-labels")
    .selectAll("text")
    .data(graph.links)
    .enter().append("text")
    .attr("font-size", 10)
    .attr("fill", "#000")
    .text(d => d.weight)
    .attr("stroke-width", d => Math.sqrt(d.weight) / 10);  // Adjust the denominator to control thickness
