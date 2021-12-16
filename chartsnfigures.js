// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

/*
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
*/    

// append the svg object to the body of the page
var svg1 = d3.select("#seatemp_chart")
  .append("svg1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read data in csv
d3.csv("seatempincrease.csv",

  //format the variables:
  function(d){
    return { date : d3.timeParse("Y")(d.Year), value : d.MeanSeaTemp}
  },

  // Use the dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x1 = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([ 0, width ]);
    svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1));

    // Add Y axis
    var y1 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.MeanSeaTemp; })])
      .range([ height, 0 ]);
    svg1.append("g")
      .call(d3.axisLeft(y1));

    // Add the line
    svg1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y(d.MeanSeaTemp) })
        )

})

















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
