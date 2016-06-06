
var app = angular.module('dashboard', []);

app.controller('dashboardCtrl', function($scope, $http) {

    ////////////////////////////////////////////////////////////////////////////////
    /// Computer use chart (speedometer)
    ///////////////////////////////////////////////////////////////////////////////
    $scope.createComputerUseChart = function(computeuser){
          if($scope.gaugeOptions == null){
              $scope.gaugeOptions = {

                 chart: {
                     type: 'solidgauge',
                      renderTo: 'cpu-usage',
                      backgroundColor:'#303030'
                 },

                 title: null,

                 pane: {
                     center: ['50%', '85%'],
                     size: '140%',
                     startAngle: -90,
                     endAngle: 90,
                     background: {
                         backgroundColor: '#EEE',
                         innerRadius: '60%',
                         outerRadius: '100%',
                         shape: 'arc'
                     }
                 },

                 tooltip: {
                     enabled: true
                 },

                 credits: {
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
                     },
                     min: 0,
                     max: 100,
                 },

                 plotOptions: {
                     solidgauge: {
                         dataLabels: {
                             y: 5,
                             borderWidth: 0,
                             useHTML: true
                         }
                     }
                 },

                 series: [{
                     data: [computeuser],
                     dataLabels: {
                         format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                             ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y}</span><br/>' +
                                '<span style="font-size:12px;color:silver">%</span></div>'
                     },
                     tooltip: {
                         valueSuffix: ' %'
                     }
                 }]
             };
          } //end if options

          // The speed gauge
          if($scope.cpruse == null){
             $scope.cpruse = new Highcharts.Chart($scope.gaugeOptions)
          }else{
             $scope.cpruse.series[0].update({
                  data: [computeuser],
             });
          }

    };

    //////////////////////////////////
    // Reads and writes chart
    //////////////////////////////////
    $scope.createreadsAndWrites = function(reads, writes){

      var data = {
          labels: [
              "Reads %",
              "Writes %",
          ],
          datasets: [
              {
                  data: [reads, writes],
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

    };




    ////////////////////////////////////////////////////////////////////////////
    // Request chart
    ///////////////////////////////////////////////////////////////////////////
    $scope.createRequestsLineChart = function(){
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
    }


    $scope.init =  function(){
        $http.get("https://relatory.herokuapp.com/relatory.php").then(function(response) {
            $scope.netin = response.data.networkin;
            $scope.netout = response.data.networkout;
            $scope.requests = response.data.requests;
            $scope.users = response.data.users;
            $scope.computeuser = response.data.cpu;
            $scope.reads = response.data.reads;
            $scope.writes = response.data.writes;
        });

        //Call chart creation
        $scope.createComputerUseChart($scope.computeuser)

        //$scope.createreadsAndWrites($scope.reads, $scope.writes);

        //$scope.createRequestsLineChart();

        setTimeout(function(){ $scope.init() }, 2000);
    }

    $scope.createreadsAndWrites(60, 40);

    $scope.createRequestsLineChart();

    $scope.init();


});
