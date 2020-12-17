const database = require('./database.js');

exports.editFlash = function (_id, flashMaker, flashMemory, flashGuarantee, flashCount) {
    let FlashModel = database.Flash();
    FlashModel.updateOne({ _id: _id }, {
        $set: {
            flashMaker: flashMaker,
            flashMemory: flashMemory,
            flashGuarantee: flashGuarantee,
            flashCount: flashCount
        }
    }, { upsert: true }, function (err) {
        if (err) {
            throw err;
        }
        console.log("Обновлен объект", _id);
    });
};