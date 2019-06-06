(function($, window, document, undefined) {

  /**
   * Render the global imbalances chart
   *
   * @uses   Highcharts, Highcharts data module (for CSV loading)
   * @param  object options {container: <jQuery element|Node|Selector>, title: <String>}
   * @return                Renders Highcharts chart to container
   */
  function renderGlobalImbalanceChart(options){
      var $chart = $('<div class="chart-global-imbalances">').appendTo(options.container);

      var chartOptions = {
        chart: {
          type: "column",
        },
        title: {
          text: options.title
        },
        credits: {
          enabled: false
        },
        xAxis: {
        },
        yAxis: {
          reversedStacks: true, // So stacks will go from top to bottom
          title: {
            text: "Percent of Global GDP"
          },
          labels: {
            format: '{value}%'
          }
        },
        legend: {
          align: "right",
          x: -30,
          verticalAlign: "top",
          y: 25,
          floating: true
        },
        tooltip: {
          // shared: true,
          // headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '<strong>{series.name}</strong>: {point.y:,.1f}%<br>'
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        },
        series: [
          {
            // name: "China",
            color: 'hsl(40, 90%, 60%)'
          },
          {
            // name: "Japan",
            color: 'hsl(80, 80%, 40%)'
          },
          {
            // name: "United States",
            color: 'hsl(0, 80%, 45%)'
          },
          {
            // name: "Germany",
            color: 'hsl(200, 40%, 50%)'
          },
          {
            // name: "Other Deficit",
            color: 'hsl(0, 65%, 75%)'
          },
          {
            // name: "Other Surplus",
            color: 'hsl(200, 40%, 30%)'
          }
        ],
        data: {
          csvURL: 'https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-global-account-imbalances-bar-chart.csv'
        }
      };

      Highcharts.chart($chart[0], chartOptions);
      return $chart;
  }
  
  /*
  // If using Shortcode.js
  new Shortcode(document.querySelector('body'), {
    'chart-imbalances': function() {
      return renderGlobalImbalanceChart({
        title: this.options.title,
        container: * How do we access this node? *
      });
    }
  });
  */
  
  jQuery(function($) {
    $('p:contains("[chart-global-imbalances]")').each(function() {
      renderGlobalImbalanceChart({
        container: $(this).empty(),
        title: 'Global Current Account Surpluses & Deficits'
      });
    });
  });
  
})(jQuery, window, document);
