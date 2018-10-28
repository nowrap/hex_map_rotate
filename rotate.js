const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.'
  },
  {
    name: 'src',
    type: String,
    multiple: false,
    defaultOption: true,
    description: 'The input file to process',
    typeLabel: '<file>'
  }
]

const options = commandLineArgs(optionDefinitions)
const fs = require('fs')

const usage = commandLineUsage([
{
  header: 'SVG Hex Map Rotator',
  content: 'Rotates a svg hex map.'
},
{
  header: 'Options',
  optionList: optionDefinitions
},
{
  content: 'Project home: {underline https://github.com/me/example}'
}
])

if (options.help) {
  console.log(usage);
  process.exit();

} else {
  const valid =
  options.help ||
  (
    /* all supplied files should exist and --log-level should be one from the list */
    options.src &&
    fs.existsSync(options.src)
  )

  if (!valid) {
    console.log(usage);
    process.exit();
  }
  /*console.log('Your options are', valid ? 'valid' : 'invalid')
  console.log(options)*/
}

const window = require('svgdom')
const SVG = require('svg.js')(window)
const document = window.document
var file = fs.readFileSync(__dirname + '/' + options.src, 'utf8');

file = file.replace("</defs>", "</defs><g id='map'>");
file = file.replace("</svg>", "</g></svg>");
// 2018-10-28
file = file.replace(/ > /g, "   ");
file = file.replace(/pqath/g, "path");
//console.log(file);

const regex = /viewBox="([\d\s\-]*)"/gm;
var matches = regex.exec(file);
var viewbox = matches[1].split(" ");

const map = SVG(document.documentElement)
map.svg(file);


var rotate_doc = true;


// coordiantes
var elements = SVG.select('#coordinates text').each(function(i, children) {
  //console.log(this);

  var x = this.attr('x');
  var y = this.attr('y');

  //console.log(x + " / " + y);

  this.transform({ rotation: -90, cx: x, cy: y }).transform({ x: -66 }, true).transform({ y: -66 }, true);
});


// things
var elements = SVG.select('#things use').each(function(i, children) {
  //console.log(this);

  var id = this.attr('xlink:href');
  var x = this.attr('x');
  var y = this.attr('y');

  if (!~id.indexOf("cliff")) {
    //console.log(id + ": " + x + " / " + y);

    this.transform({ rotation: -90, cx: x, cy: y });
  }
});


// labels
var elements = SVG.select('#labels g text').each(function(i, children) {
  //console.log(this);

  var x = this.attr('x');
  var y = this.attr('y');

  //console.log(x + " / " + y);

  this.transform({ rotation: -90, cx: x, cy: y }).transform({ x: 66 }, true).transform({ y: 66 }, true);
});


// doc
if (rotate_doc) {
  var x = viewbox[2] / 2;
  var y = viewbox[3] / 2;
  
  var d = Math.abs(viewbox[2] - viewbox[3]) / 2;

  SVG.select("#map").transform({ rotation: 90, cx: x, cy: y }).transform({ x: d }, true).transform({ y: d }, true);
}


// render and correct
var data = map.svg();
data = data.split("</svg>");
//console.log(data);
data = data[1] + "</svg>";

data = data.split(' svgjs:data="{&quot;leading&quot;:&quot;1.3&quot;}"').join('');

data = data.replace("<svg ", '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg" ');

if (rotate_doc) {
  //data = data.replace(matches[0], 'viewBox="' + viewbox[1] + ' ' + viewbox[0] + ' ' + viewbox[3] + ' ' + viewbox[2] + '"');
  viewbox[1] = 50;
  viewbox[0] = 0;
  data = data.replace(matches[0], 'viewBox="' + viewbox[1] + ' ' + viewbox[0] + ' ' + viewbox[3] + ' ' + viewbox[2] + '"');
}

var pd = require('pretty-data').pd;
var xml_pp = pd.xml(data);

var new_file = options.src;
new_file = new_file.replace(".svg", "_rotated.svg");
fs.writeFileSync(__dirname + '/' + new_file, xml_pp);