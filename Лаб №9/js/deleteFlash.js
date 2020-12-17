const database = require('./database');

exports.deleteFlash = function (flashId) {
    let FlashModel = database.Flash();

    FlashModel.deleteOne({_id: flashId}, function (err) {
        if (err) {
            throw err;
        }
        console.log("Флешка удалена", flashId);
    })
};

exports.deleteFlashByGuarantee = function (guarantee) {
    let FlashModel = database.Flash();

    FlashModel.deleteMany({flashGuarantee: guarantee}, function (err) {
        if (err) {
            throw err;
        }
        console.log("Флешки со сроком гарантии удалены", guarantee);
    })
};