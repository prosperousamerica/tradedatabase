// Use commas as the thousands separator
// Highcharts.setOptions({  
//   	lang: {
//         thousandsSep: ','
//     } 
// });

(function ($, window, document, undefined) { // Beginning of wrapper
jQuery(function ($) {

/**
 * Add blurb from list to under a chart
 * Looks for an <li> with a <strong> tag that matches the given title
 * and attaches the content (except the <strong> el) of the matching <li>
 */
window.attachBlurbsToCharts = function(options){
  var $matchingLi = $('.text-content-main > ul > li').has('strong:contains("' + options.title + '")');
  
  if (!$matchingLi.length)
    return;
  
  var blurb = $matchingLi.clone();
  blurb.find('strong').remove();
  blurb = blurb.html().replace(/^([\s:]*)/i, '');
  
  $(options.container).append(
    '<div class="chart-blurb">' 
    + blurb
    + '</div>'
  );

  // Normalize blurb height
  $('.chart-blurb').height(function(){ 
    var maxHeight = -1;

     $('.chart-blurb').each(function() {
       maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
     });
    return maxHeight;
  });
}

/**
 * Insert text content below <p>===</p> into bottom of page.
 * We do this because NationBuilder only provides one text field.
 */
var $bottomSection = $('.text-content-bottom');
var $bottomContent = $('p:contains("===")').hide().nextAll();
$bottomContent.appendTo($bottomSection);
console.log('$bottomSection', $bottomSection);
console.log('$bottomContent', $bottomContent);

/*
// If going from list to chart. Has to be fired after all charts are rendered
window.attachBlurbsToCharts = function(){
  $('.text-content > ul').children().each(function(){
	var $li = $(this);
	var blurb = $li.find('em').html();
	var chartTitle = $li.find('strong').text().replace(':', '');

	console.log('chartTitle', chartTitle, 'blurb', blurb);
	var $chart = $('#charts .chart').filter(function(){ 
    var thisChartTitle = $(this).find('.highcharts-title').text();
    console.log('thisChartTitle', thisChartTitle);
    var match = $.trim(thisChartTitle) == $.trim(chartTitle);
    if (match) console.log( 'match!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', thisChartTitle, chartTitle  );
    return $.trim(thisChartTitle) == $.trim(chartTitle);
  });

	  $chart.append($li.text());
  });
}
*/

/**
 * Default color palette
 */
window.colors = {
  red: '#ad1e23',
  blue: '#069'
};

/**
 * Render a set of charts from a CSV/TSV
 *
 * @param options { csvURL, highchartsOptions, container }
 */
window.renderChartsFromCSV = function(config) {
  var _options = {
    xAxis: {
      type: null
    }
  };

  if (!config) {
    console.warn('No configuration options were passed into renderChartsFromCSV.');
    return;
  }
  
  if (!config.csvURL) {
    console.warn('A CSV URL is required.');
    return;
  }
  
  if (!config.container) {
    console.warn('A chart container is required.');
    return;
  }
  
  if (!$(config.container).length) {
    console.log('An element matching the chart container selector "' + config.container + '" was not found on the page.');
  }

  /**
   * Parse CSV and render Highcharts chart for each column
   */

  window.parseValue = function(value) {
    var string = "" + value;
    var prefix = '';
    var suffix = '';
    var stripped = string.replace(/[^\d.-]/g, "");
    var isNumber = !isNaN(parseFloat(stripped));
    var numericValue = isNumber ? parseFloat(stripped) : null;
    
    if (string.indexOf("$") > -1) prefix = '$';
    if (string.indexOf("%") > -1) suffix = '%';
    if (string.indexOf("B") > -1) suffix = 'B';

    return {
      value: numericValue,
      isNumber: isNumber,
      prefix: prefix,
      suffix: suffix,
      original: value
    };
  };

  Papa.parse(config.csvURL, {
    download: true,
    dynamicTyping: true,
    complete: function(results) {
      var data = results.data;
      // console.log(config.csvURL, data);

      if (!data || !data.length) {
        console.error("Data could not be parsed: " + csvURL);
      }
      
      // Papa Parse may give back rows of nulls like this: [null]   
      // maybe due to line breaks/end of file?
      data = data.filter(function(row){
        return row.filter(function(val){ 
          return val !== null 
        }).length;
      });

      // Get series information
      var colNames = data[0].slice(1);
      var rowNames = data.slice(1).map(function(row) { return row[0]; });
      
      // Parse dates (this section can be removed if it doesn't work)
      // var useDateTimeAxis
      var rowNames = rowNames.map(function(name){
        var name = String(name);
        var yyyymmdd = name.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
        
        // console.log('Checking yyyymmdd', r,YYYYMMDD);
        if ( yyyymmdd ) {
          _options.xAxis.type = 'datetime';
          return Date.parse(
            yyyymmdd[1] + '/' + 
            yyyymmdd[2] + '/' + 
            yyyymmdd[3]
          );
        }
        
        return name;
      });
      
      // console.log(rowNames);
      
      var serieses = colNames.map(function(seriesName, seriesIndex) {
        // console.log("Parsing col: ", seriesName);

        var seriesDataUnparsed = data.slice(1).map(function(row) {
          return row.slice(1)[seriesIndex];
        });

        /*
        // If we'e doing an array of values
        var seriesDataAsVals = seriesDataUnparsed.map(function(value) {
          return window.parseValue(value).value;
        });
        */
        
        // If we're doing an array of point objects
        var seriesDataAsObjs = seriesDataUnparsed.map(function(value, i) {
          return {
            x: window.parseValue(rowNames[i]).isNumber ?
               window.parseValue(rowNames[i]).value :
               undefined,
            y: window.parseValue(value).value
          };
        });

        var firstNonEmptyValue = seriesDataUnparsed.filter(function(value) {
          return window.parseValue(value).isNumber;
        })[0];

        var prefix = window.parseValue(firstNonEmptyValue).prefix;
        var suffix = window.parseValue(firstNonEmptyValue).suffix;
        // console.log('prefix', prefix, 'suffix', suffix);

        var series = {
          name:   seriesName,
          index:  seriesIndex,
          data:   seriesDataAsObjs,
          prefix: prefix,
          suffix: suffix
        };

        // console.log('Series', series);
        return series;
      });
      
      // console.log('serieses', serieses);

      // Render each chart
      serieses.forEach(function(series){
        renderChart({
          id:         series.index,
          name:       series.name,
          data:       series.data,
          prefix:     series.prefix,
          suffix:     series.suffix,
          categories: rowNames,
          color:      window.colors.blue,
          xAxisType:  _options.xAxisType
          // color:      "hsl(" + (series.index - 1) * (660 / serieses.length) + ", 95%, 45%)"
        });
      });

      // console.log(results);
    }
  });

  /**
   * Render chart
   *
   * @param options { data, id, name, color, id }
   */
  var renderChart = function(options) {
    // console.log('options', options);
    var data = options.data;
    var $container = $(
      '<div class="chart"><div class="chart-target" id="chart-' + options.id + '"></div></div>'
    ).appendTo(config.container);
    var $chartTarget = $container.find('.chart-target');
    
    // Highcharts options
    var userOptions = config.highchartsOptions || {};
    var defaultOptions = {
      title: {
        text: options.name
      },
      chart: {
        // styledMode: true,
        events: {
          load: function() {
            var chart = this;
            // console.log('chart', chart);
            window.attachBlurbsToCharts({
              title: chart.userOptions.title.text,
              container: $(chart.renderTo).closest('.chart')
            });
            
            // Draw an x-axis line at y = 0 
            // if 0 occurs in the middle of the graph
            var yAxis = chart.yAxis[0];
            var yAxisExtremes = yAxis.getExtremes();
            if ( 
              yAxisExtremes.min < 0 && 
              yAxisExtremes.max > 0 
            ) {
              console.log('adding plotline');
              yAxis.addPlotLine({
                value: 0
                , width: 2
                , color: '#000'
                , zIndex: 1
                // , dashStyle: 'solid'
              });
              // Hide the original x-axis border
              chart.xAxis[0].update({
                lineWidth: '0',
                color: 'transparent'
              });
            }
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: [
        {
          categories: options.categories,
          tickInterval: 4,
          // startOnTick: true,
          // endOnTick: true
          // tickPixelInterval: 300
        }
      ],
      yAxis: [
        {
          maxPadding: 0,
          title: {
            text: undefined
          },
          labels: {
            x: -10,
            formatter: function(){
              var point = this;
              // console.log(point);
              return (
                (point.value < 0 ? '-' : '') 
                + (options.prefix || '') 
                + Math.abs(point.value).toLocaleString()
                + (options.suffix || '')
              );
            }
          }
        }
      ],
      plotOptions: {
        series: {
          // lineWidth: 3,
          marker: {
            enabled: false
          },
          negativeColor: window.colors.red
        },
        area: {
          // lineWidth: 3,
          fillOpacity: 0.5,
          negativeColor: window.colors.red
        },
        line: {
          // lineWidth: 4
        }
      },
      series: [
        {
          type: 'area',
          name: options.name,
          data: options.data,
          color: options.color,
          tooltip: {
            pointFormatter: function(){
              var point = this;
              return (
                (point.y < 0 ? '-' : '') 
                + (options.prefix || '') 
                + Math.abs(point.y).toLocaleString()
                + (options.suffix || '')
              );
            }
          }
        }
      ]
    };
    
    // Deal with objects that are inside of arrays
    var yAxis = [
      Highcharts.merge(
        (defaultOptions.yAxis ? defaultOptions.yAxis[0] : {}),
        (userOptions.yAxis ? userOptions.yAxis[0] : {})
      )
    ];
    
    var mergedOptions = Highcharts.merge(defaultOptions, userOptions);
    
    mergedOptions.yAxis = yAxis;

    var hcChart = Highcharts.chart($chartTarget[0], mergedOptions);
  };
};

/**
 * Configuration options for the different pages of the site
 */
var pages = {
  // "trade-bilateral": {},
  "trade-monthly": {
    container: "#charts.trade-monthly",
    csvURL: 'https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-monthly.tsv',
    highchartsOptions: {
      xAxis: [
        {
          type: 'datetime'
        }
      ],
      tooltip: {
        xDateFormat: '%b %Y'
      }
    }
  },
  "trade-balance": {
    container: "#charts.trade-balance",
    csvURL: 'https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-balance.tsv'
  },
  "trade-technology": {
    container: "#charts.trade-technology",
    csvURL: "https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-technology.tsv",
    yAxisTitle: "<strong>Trade Balance</strong> ($Billions)",
    highchartsOptions: {
      yAxis: [
        {
          title: {
            text: "<strong>Trade Balance</strong> ($Billions)"
          },
          labels: {}
        }
      ]
    }
  },
  "trade-currency": {
    container: "#charts.trade-currency",
    csvURL: 'https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-currency.tsv',
    highchartsOptions: {
      yAxis: [
        {
          title: {
            enabled: false,
            text: undefined
          },
          labels: {}
        }
      ],
      xAxis: [
        {
          type: 'datetime'
        }
      ],
      tooltip: {
        xDateFormat: '%b %Y'
      }
    }
  },
  "trade-global": {
    container: "#charts.trade-global",
    csvURL: "https://raw.githubusercontent.com/prosperousamerica/tradedatabase/master/data/tradedata-global.tsv",
    yAxisTitle: "<strong>Account Balance</strong> (% of GDP)",
    highchartsOptions: {
      yAxis: [
        {
          title: {
            text: "% of GDP"
          },
          labels: {}
        }
      ]
    }
  }
};

/** Run the code! **/
$.each(pages, function(key, pageOptions) {
  window.renderChartsFromCSV(pageOptions);
});


});
})(jQuery, window, document); // End of wrapper
