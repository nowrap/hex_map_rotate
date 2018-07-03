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
  header: 'Hex Map SVG 2 Kingmaker PDF Converter',
  content: 'Converts a svg hex map to a kingmaker map pdf.'
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

var path = require('path'),
    srcExt = path.extname(options.src),
    srcFilename = path.basename(options.src, srcExt),
    PDFDocument = require('pdfkit'),
    SVGtoPDF = require('svg-to-pdfkit')
    pdfFile = __dirname + '/' + srcFilename + '.pdf',
    pdfFileTemp = __dirname + '/' + srcFilename + '_temp.pdf',
    stream = fs.createWriteStream(pdfFileTemp)
;

const factor = 841.89 / 297;

var svg = fs.readFileSync(__dirname + '/' + srcFilename + '_rotated.svg', 'utf8');
//console.log("svg", svg);

// Create a document
var doc = new PDFDocument({
    layout: 'portrait',
    size: [212.7 * factor, 276.2 * factor] // a smaller document for small badge printers
});

doc.font(__dirname + '/fonts/Inkfree.ttf')
   .fontSize(25)
   .text('Greenbelt', 118 * factor, 19.5 * factor, {width: 69 * factor, align: 'center'});

SVGtoPDF(doc, svg, -1.411 * factor, 7 * factor, {width: 210 * factor});

// Stream contents to a file

stream.on('finish', function() {
    console.log('PDF created');

    const HummusRecipe = require('hummus-recipe');
    const pdfDoc = new HummusRecipe(__dirname + '/map_kingmaker_template.pdf', pdfFile);

    pdfDoc
        .editPage(1)
        .overlay(pdfFileTemp)
        .endPage()
        .endPDF(() => {
            /* done! */
            console.log("PDF overlayed");
        });
});

// Close PDF and write file.
doc.pipe(stream);
doc.end();