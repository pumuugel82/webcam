(function(){

    const Express = require("express");
    const config = require('config');
    const pictures = require('./src/pictures.js');

    const port = config.get('app.rest.port');

    const app = Express();
    app.get("/", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/index.html", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/jquery-3.5.1.min.js", (req, res) => {res.sendFile(__dirname + "/jquery-3.5.1.min.js")});
    app.get("/api/pictures/latest", pictures.latest);

    app.listen(port, () => {
        console.log("listen on port " + port)
    });

}());