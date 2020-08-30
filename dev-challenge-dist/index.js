/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
require('./site/index2.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message)
})

// const exampleSparkline = document.getElementById('example-sparkline')
// Sparkline.draw(exampleSparkline, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 80, 10, 1])

var columnDefs = [
  { headerName: "Name", field: "name" },
  { headerName: "Best Bid", field: "bestBid" },
  { headerName: "Best Ask", field: "bestAsk" },
  { headerName: "Open Bid", field: "openBid" },
  { headerName: "Open Ask", field: "openAsk" },
  { headerName: "Last change Ask", field: "lastChangeAsk" },
  { headerName: "Last change Bid", field: "lastChangeBid" },
  {
    headerName: "Sparkline", field: "sparkline", valueGetter: (params => {
      return (params.data.bestAsk + params.data.bestBid) / 2
    }), cellRenderer: 'sparklineRenderer'
  },
];

// specify the data
var rowData = [
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  },
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  },
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  },
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  },
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  },
  {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663,
    "sparkline": ''
  }

];

/**
 * Custom cell renderer for sparkline
 * @param {} params 
 */
const sparklineRenderer = (params) => {
  console.log({ params })
  let span = document.createElement('span')
  span.setAttribute('id', 'sparkline')
  let sparkline = new Sparkline(span)
  sparkline.draw([params.value])
  let div = document.createElement('div')
  div.appendChild(span)
  return div

}
// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  components: {
    sparklineRenderer: sparklineRenderer
  }
};

/**
 * Listen for dom content loading and getting table options
 */
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});