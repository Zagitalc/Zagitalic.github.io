// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// E.g. adapted from student work from 2020/21 P-Gold cohort.
// Line graph from: Y. Holtz, "Basic line chart in d3.js", D3-graph-gallery.com, 2021. [Online]. Available: https://www.d3-graph-gallery.com/graph/line_basic.html. [Accessed: 21- Jan- 2021].













// set the dimensions and margins of the graph
/*
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

*/


 

// append svg to body
var svg = d3.select("#windspeed_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");

//set variables x, y, X and Y axes 
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
/*
svg.append("text")
    .attr("transform",
        "translate(" + (width/ 2) + " ," +
        (margin.bottom ) + ")")
    .style("text-anchor", "middle")
    .text("Date");
  */


var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")

// update the data once onclick event occurs
function update(selectedVar) {
    d3.csv("hurricane data change.csv", function(data) {



    // append the rectangles for the bar chart
    // X axis
    x.domain(data.map(function(d) { return d.Decade; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
    .data(data)

    // update bars
    u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
        .attr("x", function(d) { return x(d.Decade); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", "#97b369")
    })

}

//main
// Initialize plot
update('Frequency')
