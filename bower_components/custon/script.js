
$( document ).ready(function() {
    console.log( "ready!" );

    ////////////////////////////////////////////////////////////////////////////
    // Request chart
    ///////////////////////////////////////////////////////////////////////////
    var ctx = $("#myChart");

    var data = {
        labels: ["60s ago", "55s ago", "50s ago", "45s ago", "40s ago", "35s ago", "30s ago", "25s ago", "20s ago", "15s ago", "10s ago", "5s ago", "Now"],
        datasets: [
            {
                label: "Requests",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [100, 80, 213, 250, 198, 150, 160, 120, 50, 30, 50, 150, 180],
            }
        ]
    };

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });


    ////////////////////////////////////////////////////////////////////////////////
    /// Computer use chart (speedometer)
    ///////////////////////////////////////////////////////////////////////////////

    var gaugeOptions = {

       chart: {
           type: 'solidgauge'
       },

       title: null,

       pane: {
           center: ['50%', '85%'],
           size: '140%',
           startAngle: -90,
           endAngle: 90,
           background: {
               backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
               innerRadius: '60%',
               outerRadius: '100%',
               shape: 'arc'
           }
       },

       tooltip: {
           enabled: false
       },

       // the value axis
       yAxis: {
           stops: [
               [0.1, '#55BF3B'], // green
               [0.5, '#DDDF0D'], // yellow
               [0.9, '#DF5353'] // red
           ],
           lineWidth: 0,
           minorTickInterval: null,
           tickPixelInterval: 400,
           tickWidth: 0,
           title: {
               y: -70
           },
           labels: {
               y: 16
           }
       },

       plotOptions: {
           solidgauge: {
               dataLabels: {
                   y: 5,
                   borderWidth: 0,
                   useHTML: true
               }
           }
       }
   };


    // The speed gauge
    $('#cpu-usage').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Usage'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Usage',
            data: [50],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

    //////////////////////////////////
    // Reads and writes chart
    //////////////////////////////////

    var data = {
        labels: [
            "Reads %",
            "Writes %",
        ],
        datasets: [
            {
                data: [60, 40],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#28b62c",
                ],
                hoverBackgroundColor: [
                    "rgba(75,192,192,1)",
                    "#28b62c",
                ]
            }]
    };


    var ctx2 = $("#reads-writes");
    // And for a doughnut chart
    var myDoughnutChart = new Chart(ctx2, {
        type: 'doughnut',
        data: data,
    });


});
