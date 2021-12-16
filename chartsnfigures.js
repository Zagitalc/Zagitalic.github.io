// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// E.g. adapted from student work from 2020/21 P-Gold cohort.
// Line graph from: Y. Holtz, "Basic line chart in d3.js", D3-graph-gallery.com, 2021. [Online]. Available: https://www.d3-graph-gallery.com/graph/line_basic.html. [Accessed: 21- Jan- 2021].


//Appending svg to div
const svg1 = d3.select('#lgr1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//Class used for plotting data onto svg objects
class Graph {
  constructor (data, svg) {
    this.data = data
    this.svg = svg
  }
  
  //Method/function - reads dataset cases and adds them to svg
  readdata (ylabel) {
    const svg = this.svg
    d3.csv(this.data,
      function (d) { //function for formatting date/time
        return { date: d3.timeParse('%d/%m/%Y')(d.date), amount: d.amount }
      },
      function (data) { //feed the data

        //1. x axis for time
        const x = d3.scaleTime() 
          .domain(d3.extent(data, function (d) { return d.date }))
          .range([0, width])
        
        svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x).ticks(d3.timeMonth)
          .tickFormat(d3.timeFormat('%b')))

        svg.append('text')
          .attr('class', 'x label')
          .attr('text-anchor', 'end')
          .attr('x', width - 170)
          .attr('y', height + 40)
          .text('Month')

        //2. y axis - number/frequency/amount, etc. 
        const y = d3.scaleLinear() 
          .domain([0, d3.max(data, function (d) { return +d.amount })])
          .range([height, 0])
        
        svg.append('g')
          .call(d3.axisLeft(y))

        svg.append('text')
          .attr('class', 'y label')
          .attr('text-anchor', 'end')
          .attr('x', -80)
          .attr('y', -70)
          .attr('dy', '.75em')
          .attr('transform', 'rotate(-90)')
          .text(ylabel)

        //3. path/line for data points
        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('d', d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.amount) })
          )
      }
    )
  }
}

// Use the Graph class to create as many line graph objects as needed
// data1.csv from Official UK Coronavirus Dashboard", Coronavirus.data.gov.uk, 2021. [Online]. Available: https://coronavirus.data.gov.uk/details/cases. [Accessed: 21- Jan- 2021].
//const u = (new Graph('data1.csv', svg1).readdata('Frequency'))

// or Startup funding from Kaggle. Available: https://www.kaggle.com/arindam235/startup-investments-crunchbase
const u = (new Graph('startup.csv', svg1).readdata('Amount USD'))
















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
