const Bot = require('nodemw'),
      client = new Bot('config.js')
      fs = require('fs')
      path = require("path")
;

const { exec } = require('child_process');

client.getArticle('KM:Kampagne/Karte/Greenbelt', function(err, data) {
    // error handling
    if (err) {
        return console.log(err);
    }

    //console.log("data", data);

    var res = data.split("<pre>");
    res = res[1].split("</pre>");
    res = res[0].trim();
    console.log("res", res);

    /*client.parse(data, 'Greenbelt', function(err, html, images) {
        if (err) {
            console.error(err);
            return;
        }

        client.log('HTML', html);
        client.log('Images', images);
    });*/

    var file = path.join(__dirname, "/greenbelt.txt");
    console.log("file", file);

    var svg = path.join(__dirname, "/greenbelt.svg");
    var svg2 = svg.replace(".svg", "_rotated.svg");
    console.log("svg", svg, svg2);

    var pl = path.join(__dirname, "/lib/hex-mapping/text-mapper.pl");
    console.log("pl", pl);

    var js = path.join(__dirname, "/rotate.js");
    console.log("js", js);

    var pdf = path.join(__dirname, "/greenbelt.pdf");
    var pdf_js = path.join(__dirname, "/map2pdf.js");
    console.log("pdf_js", pdf_js);

    fs.writeFile(file, res, function(err) {
        if (err) {
            return console.log(err);
        }

        exec('/usr/bin/perl ' + pl + ' render < ' + file + ' > ' + svg, (err, stdout, stderr) => {
            if (err) {
                return console.log(err);
            }

            exec('/usr/bin/node ' + js + ' ' + path.basename(svg), (err, stdout, stderr) => {
                if (err) {
                    return console.log(err);
                }

                fs.readFile(svg2, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }

                    //console.log(data);

                    client.logIn(function() {
                        client.upload("Greenbelt.svg", new Buffer(data, 'binary'), "Neues Rendering", function() {
                        });
                    });

                    exec('/usr/bin/node ' + pdf_js + ' ' + path.basename(svg), (err, stdout, stderr) => {
                        if (err) {
                            return console.log(err);
                        }

                        console.log(stdout);

                        fs.readFile(pdf, function (err, data) {
                            if (err) {
                                return console.log(err);
                            }

                            client.logIn(function() {
                                client.upload("Greenbelt.pdf", new Buffer(data, 'binary'), "Neues Rendering", function() {
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});