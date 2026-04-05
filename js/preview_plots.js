// ============================================================
//  preview_plots.js  —  charts to showcase colors
// ============================================================

Chart.defaults.global.defaultFontFamily = "Menlo, Monaco, Consolas, monospace";
Chart.defaults.global.defaultFontSize = 14;

function updateColorData() {
      labels = [
        document.getElementById("targetText1").textContent,
        document.getElementById("targetText2").textContent,
        document.getElementById("targetText3").textContent,
        document.getElementById("targetText4").textContent,
        document.getElementById("targetText5").textContent
      ];

      // colors = [
      //   document.getElementById("target1").style.backgroundColor,
      //   document.getElementById("target2").style.backgroundColor,
      //   document.getElementById("target3").style.backgroundColor,
      //   document.getElementById("target4").style.backgroundColor,
      //   document.getElementById("target5").style.backgroundColor
      // ];

      colors = [1,2,3,4,5].map(i => {
        const hex = document.getElementById("target" + i).dataset.hex;
        if (!hex || hex === 'undefined') return document.getElementById("target" + i).style.backgroundColor;
        const simulated = colorblindType === 'none' ? hex : simulateColorblindness(hex, colorblindType);
        return simulated;
    });
}

function drawPieChart() {
  // pie chart
  updateColorData();

  if (pieChart) {
    pieChart.destroy();
  }

  pieChart = new Chart("pieChart", {
    type: "pie",
    data: {
        labels: labels,
        datasets: [{data: [40, 49, 44, 24, 30], backgroundColor: colors}]
        },
    options: {
      responsive: true,
      layout: { padding: { top: 10, bottom: 10 } },
      legend: {
          labels: {fontSize: 14, boxWidth: 25, boxHeight:10, padding: 20, fontFamily: "Menlo, monospace" },
          position:"right"
      },
      tooltips: {
          displayColors: false,
          callbacks: {
            title: function() {
              return "";
            },
            label: function(tooltipItem, data) {
              return data.labels[tooltipItem.index];
            }
          }
        }
    }
  });
}

function drawLineChart() {
    // line chart
    updateColorData();

    if (lineChart) {
      lineChart.destroy();
    }

    lineChart = new Chart("lineChart", {
      type: "line",
      data: {
        labels: [100,200,300,400,500,600,700,800,900,1000],
        datasets: [{
          data: [860,1140,1060,1060,1070,1110,1330,2210,1830,2478],
          borderColor: colors[0],
          label: labels[0],
          fill: false
        },{
          data: [1600,1700,1700,1900,2000,2700,3000,500,600,700],
          borderColor: colors[1],
          label: labels[1],
          fill: false
        },{
          data: [300,700,2000,3000,2800,2400,2000,1000,200,100],
          borderColor: colors[2],
          label: labels[2],
          fill: false
        },{
          data: [500,300,1000,500,700,800,1000,2000,300,400],
          borderColor: colors[3],
          label: labels[3],
          fill: false
        },{
          data: [2000,1800,1500,1100,1200,900,700,400,300,500],
          borderColor: colors[4],
          label: labels[4],
          fill: false
        }]
      },
      options: {
        responsive: true,
        layout: { padding: { top: 20, bottom: 10 } },
        legend: {
            labels: {fontSize: 14, boxWidth: 25, boxHeight:10, padding: 20, fontFamily: "Menlo, monospace"},
            position:"right"
        },
        tooltips: {
            displayColors: false,
            callbacks: {
              title: function() {
                return "";
              },
              label: function(tooltipItem, data) {
                return data.labels[tooltipItem.index];
              }
            }
          },
          scales: {
              xAxes: [{
                ticks: {
                  fontColor: "gray"   // color of tick labels
                },
                gridLines: {
                  color: "gray",       // grid line color
                  zeroLineColor: "gray"
                }
              }],
              yAxes: [{
                ticks: {
                  fontColor: "gray"
                },
                gridLines: {
                  color: "gray",
                  zeroLineColor: "gray"
                }
              }]
            }
      }
    });
}

function drawBarChart() {
    // bar chart
    updateColorData();

    if (barChart) {
      barChart.destroy();
    }

    barChart = new Chart("barChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
                    {
                      label: labels[0],
                      backgroundColor: colors[0],
                      data: [55,0,0,0,0]
                    },
                    {
                      label: labels[1],
                      backgroundColor: colors[1],
                      data: [0,49,0,0,0]
                    },
                    {
                      label: labels[2],
                      backgroundColor: colors[2],
                      data: [0,0,44,0,0]
                    },
                    {
                      label: labels[3],
                      backgroundColor: colors[3],
                      data: [0,0,0,24,0]
                    },
                    {
                      label: labels[4],
                      backgroundColor: colors[4],
                      data: [0,0,0,0,30]
                    }
                    ]
      },
      options: {
        responsive: true,
        layout: { padding: { top: 20, bottom: 10 } },
        legend: {
            labels: {fontSize: 14, boxWidth: 25, boxHeight:10, padding: 20, fontFamily: "Menlo, monospace" },
            position: "right"
        },
        tooltips: {
            displayColors: false,
            callbacks: {
              title: function() {
                return "";
              },
              label: function(tooltipItem, data) {
                return data.labels[tooltipItem.index];
              }
            }
        },
          scales: {
              xAxes: [{
                ticks: {
                  fontColor: "gray"   // color of tick labels
                },
                gridLines: {
                  color: "gray",       // grid line color
                  zeroLineColor: "gray"
                },
              stacked: true
              }],
              yAxes: [{
                ticks: {
                  fontColor: "gray", min: 0,
                },
                gridLines: {
                  color: "gray",
                  zeroLineColor: "gray"
                },
                stacked: true
              }]
            }
      }
    });
}

function drawScatterChart() {
    // scatter chart
    updateColorData();

    if (scatterChart) {
      scatterChart.destroy();
    }

    var xyValues1 = [ {x:19, y:16}, {x:41, y:9}, {x:33, y:10}, {x:33, y:27}, {x:19, y:10}, {x:51, y:67}, {x:19, y:15}, {x:26, y:4}, {x:55, y:5}, {x:17, y:13}, {x:67, y:48}, {x:27, y:53}, {x:73, y:42}, {x:94, y:95}, {x:16, y:0}, {x:65, y:2}, {x:61, y:46}, {x:4, y:76}, {x:46, y:35}, {x:95, y:40}, ];
    var xyValues2 = [ {x:2, y:33}, {x:35, y:5}, {x:36, y:26}, {x:22, y:87}, {x:58, y:36}, {x:84, y:68}, {x:61, y:96}, {x:98, y:71}, {x:94, y:37}, {x:15, y:29}, {x:61, y:86}, {x:51, y:87}, {x:42, y:65}, {x:8, y:78}, {x:98, y:27}, {x:40, y:39}, {x:88, y:41}, {x:85, y:82}, {x:6, y:91}, {x:73, y:34}, ];
    var xyValues3 = [ {x:53, y:88}, {x:70, y:26}, {x:93, y:86}, {x:60, y:99}, {x:39, y:17}, {x:6, y:46}, {x:61, y:59}, {x:40, y:49}, {x:91, y:13}, {x:10, y:17}, {x:17, y:59}, {x:11, y:9}, {x:88, y:37}, {x:95, y:94}, {x:56, y:25}, {x:82, y:46}, {x:48, y:6}, {x:42, y:52}, {x:67, y:92}, {x:47, y:34}, ];
    var xyValues4 = [ {x:13, y:67}, {x:88, y:11}, {x:91, y:76}, {x:66, y:5}, {x:21, y:33}, {x:44, y:98}, {x:53, y:54}, {x:44, y:81}, {x:83, y:56}, {x:45, y:47}, {x:19, y:24}, {x:58, y:24}, {x:94, y:62}, {x:60, y:45}, {x:97, y:56}, {x:90, y:50}, {x:77, y:83}, {x:2, y:32}, {x:18, y:14}, {x:23, y:23}, ];
    var xyValues5 = [ {x:12, y:16}, {x:28, y:43}, {x:27, y:45}, {x:10, y:53}, {x:19, y:3}, {x:39, y:77}, {x:78, y:59}, {x:32, y:4}, {x:46, y:97}, {x:38, y:90}, {x:30, y:26}, {x:84, y:47}, {x:5, y:14}, {x:24, y:92}, {x:96, y:29}, {x:8, y:51}, {x:35, y:63}, {x:57, y:46}, {x:56, y:52}, {x:21, y:2}, ];

    scatterChart = new Chart("scatterChart", {
      type: "scatter",
      data: {
            datasets: [{
              data: xyValues1,
              pointRadius: 4,
              pointBackgroundColor: colors[0],
              borderColor: colors[0],
              backgroundColor: colors[0],
              label: labels[0],
            },{
              data: xyValues2,
              pointRadius: 4,
              pointBackgroundColor: colors[1],
              borderColor: colors[1],
              backgroundColor: colors[1],
              label: labels[1],
              fill: false
            },{
              data: xyValues3,
              pointRadius: 4,
              pointBackgroundColor: colors[2],
              borderColor: colors[2],
              backgroundColor: colors[2],
              label: labels[2],
              fill: false
            },{
              data: xyValues4,
              pointRadius: 4,
              pointBackgroundColor: colors[3],
              borderColor: colors[3],
              backgroundColor: colors[3],
              label: labels[3],
              fill: false
            },{
              data: xyValues5,
              pointRadius: 4,
              pointBackgroundColor: colors[4],
              borderColor: colors[4],
              backgroundColor: colors[4],
              label: labels[4],
              fill: false
            }]
        },
        options: {
          responsive: true,
          layout: { padding: { top: 20, bottom: 10 } },
          legend: {
              labels: {fontSize: 14, boxWidth: 25, boxHeight:10, padding: 20, fontFamily: "Menlo, monospace"},
              position:"right"
          },
          tooltips: {
              displayColors: false,
              callbacks: {
                title: function() {
                  return "";
                },
                label: function(tooltipItem, data) {
                  return data.labels[tooltipItem.index];
                }
              }
          },
        scales: {
            xAxes: [{
              ticks: {
                fontColor: "gray"   // color of tick labels
              },
              gridLines: {
                color: "gray",       // grid line color
                zeroLineColor: "gray"
              }
            }],
            yAxes: [{
              ticks: {
                fontColor: "gray"
              },
              gridLines: {
                color: "gray",
                zeroLineColor: "gray"
              }
            }]
          }
      }
    });
}

function toggleCharts() {
  const container = document.getElementById("chartContainer");

  if (!chartShown) {
      container.style.display = "block";
      chartShown = true;
  }

  drawScatterChart();
  document.getElementById("scatterChart").style.border = "2px solid #37322c";
  document.getElementById("scatterChart").style.borderRadius = "10px";

  drawLineChart();
  document.getElementById("lineChart").style.border = "2px solid #37322c";
  document.getElementById("lineChart").style.borderRadius = "10px";

  drawBarChart();
  document.getElementById("barChart").style.border = "2px solid #37322c";
  document.getElementById("barChart").style.borderRadius = "10px";

  drawPieChart();
  document.getElementById("pieChart").style.border = "2px solid #37322c";
  document.getElementById("pieChart").style.borderRadius = "10px";

  document.getElementById("chartButtonText").textContent = "Update Plots";

  document.getElementById('pieChart').classList.add('chart-canvas');
  document.getElementById('lineChart').classList.add('chart-canvas');
  document.getElementById('barChart').classList.add('chart-canvas');
  document.getElementById('scatterChart').classList.add('chart-canvas');
  }
