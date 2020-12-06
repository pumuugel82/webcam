(function(){

    const fs = require('fs');
    const express = require("express");
    const app = express();
    const port = 90;
    const config = require('config');
    const picSrcDir = __dirname + config.get('pictures.source.directory');


    app.get("/", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/index.html", (req, res) => {res.sendFile(__dirname + "/index.html")});
    app.get("/jquery-3.5.1.min.js", (req, res) => {res.sendFile(__dirname + "/jquery-3.5.1.min.js")});
    app.get("/api/pictures/all", all);
    app.get("/api/pictures/latest", latest);
    app.get("/api/picture/:name", picture);

    app.listen(port, () => {
        console.log("listen on port " + port)
    });

    /**
     * Returns a the names of all pictures available.
     * @param {*} req 
     * @param {*} res 
     */
    function all(req, res) {
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

    /**
     * Liefert das älteste Bild zurück.
     * @param {*} req 
     * @param {*} res 
     */
    function latest(req, res) {

        let filesPromise = fs.promises.readdir(picSrcDir);
        
        filesPromise.then((filesArray) => {
            // Vieleicht zu umstaendlich aber es geht erstmal...
            let ary = filesArray.sort().reverse();

            // lieber path.join()...
            let fullPicPath = picSrcDir + "/" + ary[0];
            log(fullPicPath);
            
            res.sendFile(fullPicPath, {}, function (err) {
                if (err) {
                    log(err)
                }
            });
        });
    }

    function log(what) {
        console.log("" + what);
    }

}())