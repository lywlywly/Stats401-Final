const width = 1200;
const height = 900;

let processedData; // Variable to store processed data
let nodes = [];  
let links = []; 
d3.csv("merged_data.csv", function(d){
    return{
        name: d.Name,
        weight: Number(d.Number)
    };
}).then(function(data) {
    processedData = data; 
    processedData.forEach(row=>{
        const names = JSON.parse(row.name.replace(/'/g, "\""));  // Convert the string to a valid JSON format and then parse it
        const weight = row.weight;

        // console.log(names);  
        // console.log(weight); 
        for (let i = 0; i < names.length; i++) {
            // Only add a node if it doesn't already exist
            if (!nodes.find(n => n.id === names[i])) {
                nodes.push({
                    id: names[i]
                });
            }
        }
        // console.log(nodes)
        for (let i = 0; i < names.length; i++) {
            for (let j = i + 1; j < names.length; j++) {
                links.push({
                    source: nodes.find(n => n.id === names[i]),
                    target: nodes.find(n => n.id === names[j]),
                    weight:weight
                });
            }
        }
    })

    const graph = { nodes: nodes, links: links };
    console.log(graph)
    const color = d3.scaleOrdinal(d3.schemeCategory10); 
    color.domain(graph.nodes.map(node => node.id));
    const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
        // const color = d3.scaleOrdinal()
        // .domain(['type1', 'type2', 'type3', 'type4', 'type5'])
        // .range(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']); 
    // console.log(graph)
    const simulation = d3.forceSimulation(graph.nodes)
        .force('link', d3.forceLink(graph.links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2));
    
    const link = svg.append('g')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
        .style('stroke', '#CCCCFF')
        .style('stroke-width', d => d.weight/20)
        .style('opacity', 0.5);
    link.append('title')
        .text(d => d.weight);
    
    const node = svg.append('g')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
        .attr('r', 8)
        .style('fill', d => color(d.id))
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))
            .on("click", function(event,d) {  
                console.log(d);
                // alert("Node ID: " + d.id);
                // Reset visual appearance of nodes and links
                reset();
                // node.style('opacity', 0);
                link.style('opacity', 0.1);
                // Highlight the clicked node
                d3.select(this).style('fill', 'red');

                // Highlight all nodes connected to the clicked node and show link weights
                link
                    .filter(l => l.source === d || l.target === d)
                    .style('stroke', 'red')
                    .style('opacity', 0.8)
                    .each(function(l) {
                        console.log(`Link between ${l.source.id} and ${l.target.id} has weight: ${l.weight}`);
                    }); 
                    // .each(function(l) {
                    //     d3.select(this).append('title').text(l => l.weight); // Show weight as tooltip
                    // });

                node
                    .filter(n => links.some(l => (l.source === d && l.target === n) || (l.target === d && l.source === n)))
                    .style('fill', 'orange'); // Highlight connected nodes
            });
            
    
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
    function reset() {
        console.clear();
        // Reset link appearance
        link.style('stroke', '#CCCCFF').style('opacity', 0.5);
    
        // Reset node appearance
        node.style('fill', d => color(d.id));
    }

    

});

