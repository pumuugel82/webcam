(function(){

    const fs = require('fs');
    const config = require('config');
    const picSrcDir = __dirname + config.get('pictures.source.directory');

    /**
     * Liefert das juengste Bild zurück.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    function latest(req, res) {  

        fs.readdir(picSrcDir, (err, filesArray) => {

            if (err) {
                log(err);
                return;
            }

            // Vieleicht zu umstaendlich aber es geht erstmal...
            let files = filesArray.sort().reverse();

            // lieber path.join()...
            let fullPicPath = picSrcDir + "/" + files[0];
            log("Sending file: " + fullPicPath);
            
            res.sendFile(fullPicPath, {}, function (err) {
                if (err) {
                    log(err)
                }
            });

        });

    }

    function log(what) {
        console.log(what);
    }

    module.exports.latest = latest;

}());