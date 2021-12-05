//d3.js charts used in dataset



// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;




 // set the ranges
var x = d3.scaleBand()
.range([0, width])
.padding(0.1);
var y = d3.scaleLinear()
.range([height, 0]);

// append the svg object to the body of the page


// append the svg object to the body of the page
var svg = d3.select("#windspeed_chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
"translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("hurricane data from noaa selected.csv", function(error, data) {
if (error) throw error;

// format the data
data.forEach(function(d) {
d.Windspeed = +d.Windspeed;
});

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.Date; }));
y.domain([50, d3.max(data, function(d) { return d.Windspeed; })]);


// append the rectangles for the bar chart
svg.selectAll(".bar")
.data(data)
.enter()
.append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.Date); })
.attr("width", x.bandwidth())
.attr("y", function(d) { return y(d.Windspeed); })
.attr("height", function(d) { return height - y(d.Windspeed); });

  

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// add the y Axis
svg.append("g")

.call(d3.axisLeft(y));

});

