//chart.js charts used in dataset

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
    