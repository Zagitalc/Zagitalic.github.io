//chart.js charts used in dataset
/*
const ctx = document.getElementById('myChart1');
    const chartData = 'hurricane data from noaa selected.csv';
    d3.csv(chartData).then(function(ds){
        console.log(ds)
        const date = [];
        const windspd = [];
        const name = [];

        for (i=0; i < ds.length; i++) {
            date.push(ds[i].date)
            windspd.push(ds[i].windspd)
            name.push(ds[i].name)
        }

        

        

        const myChart1 = new Chart(ctx, {
            type: 'bar', 
            data: {
                //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: windspd,
                    backgroundColor: 
                        'rgba(255, 99, 132, 0.2)',
                        
                    
                    borderColor: 
                        
                        'rgba(153, 102, 255, 1)',
                        
                    
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
 */
    


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
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
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
svg.selectAll("mybar")
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

