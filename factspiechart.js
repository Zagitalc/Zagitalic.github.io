/**
 *@description Chart modified with reference to https://www.d3-graph-gallery.com/graph/pie_annotation.html
 *  set the with and height of the graph
 */



  
var width = 450
    height = 450
    margin = 40

 

var radius = Math.min(width, height) / 2 - margin
/**
 * appends the svg object to the div
 * 
 */
 
var svg = d3.select("#hurpie_chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

/**
 * Create dummy data: year of hurricane season and value of disaster cost
 * @type {data} 
 *
 */
var data = {2017: 294.8, 2005: 172.3, 2021: 70.5, 2004:61.1, 2020:51.1}

/**
 *  set the color scale
 */ 
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

/**
 *  Computes the position of  each group on the pie:
 *  - each data of the dataset
 *  - returns value of dataset 
 *  
 */

var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
/**
 *  Builds the pie chart using the arc function.
 *  used to make outer radius of the piechart
 */
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

/**
 *  Builds the pie chart using the arc function.
 */
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
/**
 *  SVG adds the annotation
 *  includes year followed by the cost of each hurricane season
 *  Coordinates obtained using the centroid method 
 *   
 */
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key +` Season $`+ d.data.value +"bil"})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 14)
