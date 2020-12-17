const database = require('./database');

exports.addFlash = function (flashMaker, flashMemory, flashGuarantee, flashCount) {
    let FlashModel = database.Flash();
    let flash = new FlashModel({
        flashMaker: flashMaker,
        flashMemory: flashMemory,
        flashGuarantee: flashGuarantee,
        flashCount: flashCount
    });
    flash.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("Объект сохранен: ", flash);
    });
};