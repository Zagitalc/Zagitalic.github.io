
/**
 * update the bar chart using onmouseover and onmouseout events
 * @param {btnName} - button name
 * @param {newVar} - variable on the y axis to be updated
 * @param {revertText} - to display the original test on the targeted button
 * mouseover event reference: w3schools https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmouseover_dom
 */


function hover(btnName,newVar,revertText){

document.getElementById(btnName,newVar).onmouseover = function() {mouseOver(btnName,newVar)};
document.getElementById(btnName,revertText).onmouseout = function() {mouseOut(btnName,revertText)};
}


function mouseOver(btnName,newVar){
    document.getElementById(btnName).innerText="Hello! Data has been activated successfully!" 
    update(newVar) 
    
}    
 
function mouseOut(btnName,revertText){
    document.getElementById(btnName).innerText=revertText
}
hover("button1",'Frequency','Frequency of Hurricanes ')
hover("button2",'FreqOverhundred','Frequency of Hurricanes with windspeeds over 100mph')
hover("button3",'percentage','Percentage (over 100mph / total no. of Hurricanes)' )

/**
 * Reference: Bar chart modified from Yan Holtz at https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html
 * // set the dimensions and margins of the graph
 */

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1020 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;


/**
 * set the dimensions and margins of the graph
 *  */ 

 


/**
 * // append svg to body
 * @type {svg}
 *  
 */
var svg = d3.select("#windspeed_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");
/**
 * set variables x, y, X and Y axes 
 */

var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")


var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")

/**
 * update the data once onclick event occurs
 * @param {string} selectedVar - value of the y coorinate e.g hurricane Frequency 
 */

function update(selectedVar) {
    d3.csv("hurricane data change.csv", function(data) {


/**
 * append the rectangles for the bar chart
 *  X axis
 */
    
    
    x.domain(data.map(function(d) { return d.Decade; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    
    /**
     * Add Y axis
     */
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
    /**
     *  @var {u} - map data to existing bars
     */
   
    var u = svg.selectAll("rect")
    .data(data)
    
    
   
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
/**
 *  Initialize plot
 *  main
 * 
 */

update('Frequency')
