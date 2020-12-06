(function(){

    const fs = require('fs');
    const express = require("express");
    const app = express();
    const port = 90;
    const config = require('config');
    const picSrcDir = __dirname + config.get('pictures.source.directory');


    app.get("/", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/index.html", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/api/picture/all", pictures);
    app.get("/api/picture/:name", picture);

    app.listen(port, () => {
        console.log("listen on port " + port)
    });

    /**
     * Returns a the names of all pictures available.
     * @param {*} req 
     * @param {*} res 
     */
    function pictures(req, res) {
        let filesPromise = fs.promises.readdir(picSrcDir);
        filesPromise.then((filesArray) => {
            res.send(JSON.stringify(filesArray));            
        });
    }

    /**
     * Returns one specific picture. 
     * @param {*} req 
     * @param {*} res 
     */
    function picture(req, res) {

        let picName = req.params.name;
        log(req.params.name);

        let fullPicPath = picSrcDir + "/" + picName;
        log(fullPicPath);
        
        res.sendFile(fullPicPath, {}, function (err) {
            if (err) {
              log(err)
            }
          });
    }

    function log(what) {
        console.log("" + what);
    }

}())