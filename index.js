(function(){

    const express = require("express");
    const app = express();
    const port = 90;

    app.get("/api/picture/all", pictures);
    app.get("/api/picture/:id", picture);

    app.listen(port, () => {
        console.log("listen on port " + port)
    });

    /**
     * Returns a description of all pictures available.
     * @param {*} req 
     * @param {*} res 
     */
    function pictures(req, res) {
        let pics = [];
        pics.push({
            "name" : "DICM_2020_12_01_12_45_00.jpg",
            "date" : "2020-12-01",
            "time" : "12:45:00"
        });
        pics.push({
            "name" : "DICM_2020_12_01_12_46_00.jpg",
            "date" : "2020-12-01",
            "time" : "12:46:00"
        });
        pics.push({
            "name" : "DICM_2020_12_01_12_47_00.jpg",
            "date" : "2020-12-01",
            "time" : "12:47:00"
        });
        pics.push({
            "name" : "DICM_2020_12_01_12_48_00.jpg",
            "date" : "2020-12-01",
            "time" : "12:48:00"
        });
        log("all");
        res.send(JSON.stringify(pics));
    }

    /**
     * Returns one specific picture. 
     * @param {*} req 
     * @param {*} res 
     */
    function picture(req, res) {
        let pic = {
            "name" : "DICM_2020_12_01_12_45_00.jpg",
            "date" : "2020-12-01",
            "time" : "12:45:00",
            "data" : "BASE64 encoded data"
        };
        log(req.params.id)
        res.send(JSON.stringify(pic));
    }

    function log(what) {
        console.log("Request to picture: " + what);
    }

}())