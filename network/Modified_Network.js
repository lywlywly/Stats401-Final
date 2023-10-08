const width = 800;
const height = 600;

function generateGraphData(nodeCount, linkCount) {
    const nodes = [];
    const links = [];

    const types = ['type1', 'type2', 'type3', 'type4', 'type5']; 


    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            id: `Node${i}`,
            type: types[Math.floor(Math.random() * types.length)]
        });
    }

   

    for (let i = 0; i < linkCount; i++) {
        links.push({
            source: nodes[Math.floor(Math.random() * nodeCount)].id,
            target: nodes[Math.floor(Math.random() * nodeCount)].id
        });
    }

    return {
        nodes: nodes,
        links: links
    };
}

const graph = {'nodes': [{'id': 'xingqiu', 'type': 'type1'}, {'id': 'yelan', 'type': 'type1'}, {'id': 'shinobu', 'type': 'type1'}, {'id': 'nahida', 'type': 'type1'}, {'id': 'xiangling', 'type': 'type1'}, {'id': 'bennett', 'type': 'type1'}, {'id': 'kazuha', 'type': 'type1'}, {'id': 'shougun', 'type': 'type1'}, {'id': 'ayaka', 'type': 'type1'}, {'id': 'kokomi', 'type': 'type1'}, {'id': 'shenhe', 'type': 'type1'}, {'id': 'alhatham', 'type': 'type1'}, {'id': 'zhongli', 'type': 'type1'}, {'id': 'hutao', 'type': 'type1'}, {'id': 'sara', 'type': 'type1'}, {'id': 'tartaglia', 'type': 'type1'}], 'links': [{'source': 'xingqiu', 'target': 'yelan', 'weight': 441}, {'source': 'xingqiu', 'target': 'shinobu', 'weight': 273}, {'source': 'xingqiu', 'target': 'nahida', 'weight': 273}, {'source': 'xingqiu', 'target': 'xiangling', 'weight': 431}, {'source': 'xingqiu', 'target': 'bennett', 'weight': 484}, {'source': 'xingqiu', 'target': 'kazuha', 'weight': 417}, {'source': 'xingqiu', 'target': 'shougun', 'weight': 401}, {'source': 'xingqiu', 'target': 'kokomi', 'weight': 165}, {'source': 'xingqiu', 'target': 'ayaka', 'weight': 106}, {'source': 'xingqiu', 'target': 'shenhe', 'weight': 106}, {'source': 'xingqiu', 'target': 'alhatham', 'weight': 89}, {'source': 'xingqiu', 'target': 'zhongli', 'weight': 201}, {'source': 'xingqiu', 'target': 'hutao', 'weight': 201}, {'source': 'xingqiu', 'target': 'sara', 'weight': 53}, {'source': 'xingqiu', 'target': 'tartaglia', 'weight': 83}, {'source': 'yelan', 'target': 'shinobu', 'weight': 240}, {'source': 'yelan', 'target': 'nahida', 'weight': 240}, {'source': 'yelan', 'target': 'xiangling', 'weight': 425}, {'source': 'yelan', 'target': 'bennett', 'weight': 478}, {'source': 'yelan', 'target': 'kazuha', 'weight': 411}, {'source': 'yelan', 'target': 'shougun', 'weight': 428}, {'source': 'yelan', 'target': 'ayaka', 'weight': 133}, {'source': 'yelan', 'target': 'kokomi', 'weight': 192}, {'source': 'yelan', 'target': 'shenhe', 'weight': 133}, {'source': 'yelan', 'target': 'alhatham', 'weight': 56}, {'source': 'yelan', 'target': 'zhongli', 'weight': 201}, {'source': 'yelan', 'target': 'hutao', 'weight': 201}, {'source': 'yelan', 'target': 'sara', 'weight': 53}, {'source': 'yelan', 'target': 'tartaglia', 'weight': 50}, {'source': 'shinobu', 'target': 'nahida', 'weight': 273}, {'source': 'shinobu', 'target': 'xiangling', 'weight': 273}, {'source': 'shinobu', 'target': 'bennett', 'weight': 273}, {'source': 'shinobu', 'target': 'kazuha', 'weight': 158}, {'source': 'shinobu', 'target': 'shougun', 'weight': 240}, {'source': 'shinobu', 'target': 'kokomi', 'weight': 59}, {'source': 'shinobu', 'target': 'alhatham', 'weight': 89}, {'source': 'shinobu', 'target': 'tartaglia', 'weight': 33}, {'source': 'nahida', 'target': 'xiangling', 'weight': 273}, {'source': 'nahida', 'target': 'bennett', 'weight': 273}, {'source': 'nahida', 'target': 'kazuha', 'weight': 158}, {'source': 'nahida', 'target': 'shougun', 'weight': 240}, {'source': 'nahida', 'target': 'kokomi', 'weight': 59}, {'source': 'nahida', 'target': 'alhatham', 'weight': 89}, {'source': 'nahida', 'target': 'tartaglia', 'weight': 33}, {'source': 'xiangling', 'target': 'bennett', 'weight': 516}, {'source': 'xiangling', 'target': 'kazuha', 'weight': 401}, {'source': 'xiangling', 'target': 'shougun', 'weight': 433}, {'source': 'xiangling', 'target': 'ayaka', 'weight': 143}, {'source': 'xiangling', 'target': 'kokomi', 'weight': 202}, {'source': 'xiangling', 'target': 'shenhe', 'weight': 143}, {'source': 'xiangling', 'target': 'alhatham', 'weight': 89}, {'source': 'xiangling', 'target': 'zhongli', 'weight': 100}, {'source': 'xiangling', 'target': 'hutao', 'weight': 100}, {'source': 'xiangling', 'target': 'tartaglia', 'weight': 83}, {'source': 'bennett', 'target': 'kazuha', 'weight': 454}, {'source': 'bennett', 'target': 'shougun', 'weight': 486}, {'source': 'bennett', 'target': 'ayaka', 'weight': 143}, {'source': 'bennett', 'target': 'kokomi', 'weight': 202}, {'source': 'bennett', 'target': 'shenhe', 'weight': 143}, {'source': 'bennett', 'target': 'alhatham', 'weight': 89}, {'source': 'bennett', 'target': 'zhongli', 'weight': 153}, {'source': 'bennett', 'target': 'hutao', 'weight': 153}, {'source': 'bennett', 'target': 'sara', 'weight': 53}, {'source': 'bennett', 'target': 'tartaglia', 'weight': 83}, {'source': 'kazuha', 'target': 'shougun', 'weight': 371}, {'source': 'kazuha', 'target': 'ayaka', 'weight': 191}, {'source': 'kazuha', 'target': 'kokomi', 'weight': 191}, {'source': 'kazuha', 'target': 'shenhe', 'weight': 191}, {'source': 'kazuha', 'target': 'zhongli', 'weight': 201}, {'source': 'kazuha', 'target': 'hutao', 'weight': 201}, {'source': 'kazuha', 'target': 'sara', 'weight': 53}, {'source': 'kazuha', 'target': 'tartaglia', 'weight': 83}, {'source': 'kazuha', 'target': 'alhatham', 'weight': 33}, {'source': 'shougun', 'target': 'ayaka', 'weight': 143}, {'source': 'shougun', 'target': 'kokomi', 'weight': 202}, {'source': 'shougun', 'target': 'shenhe', 'weight': 143}, {'source': 'shougun', 'target': 'alhatham', 'weight': 56}, {'source': 'shougun', 'target': 'zhongli', 'weight': 103}, {'source': 'shougun', 'target': 'hutao', 'weight': 103}, {'source': 'shougun', 'target': 'sara', 'weight': 53}, {'source': 'ayaka', 'target': 'kokomi', 'weight': 191}, {'source': 'ayaka', 'target': 'shenhe', 'weight': 191}, {'source': 'ayaka', 'target': 'zhongli', 'weight': 48}, {'source': 'ayaka', 'target': 'hutao', 'weight': 48}, {'source': 'kokomi', 'target': 'shenhe', 'weight': 191}, {'source': 'kokomi', 'target': 'zhongli', 'weight': 48}, {'source': 'kokomi', 'target': 'hutao', 'weight': 48}, {'source': 'shenhe', 'target': 'zhongli', 'weight': 48}, {'source': 'shenhe', 'target': 'hutao', 'weight': 48}, {'source': 'alhatham', 'target': 'tartaglia', 'weight': 33}, {'source': 'zhongli', 'target': 'hutao', 'weight': 201}, {'source': 'zhongli', 'target': 'sara', 'weight': 53}, {'source': 'zhongli', 'target': 'tartaglia', 'weight': 50}, {'source': 'hutao', 'target': 'sara', 'weight': 53}, {'source': 'hutao', 'target': 'tartaglia', 'weight': 50}]};

const color = d3.scaleOrdinal()
    .domain(['type1', 'type2', 'type3', 'type4', 'type5'])
    .range(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']); 


const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

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
    .style('fill', d => color(d.type))
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
