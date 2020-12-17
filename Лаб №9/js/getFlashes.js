const database = require("./database");

exports.getFlashes = function (request, response) {
    let FlashModel = database.Flash();

    FlashModel.find({}, null, function (err, flashes) {
        if (err) {
            throw err;
        }
        response.render('index', {title: 'Hello!', flashes: flashes});
    });
};


exports.getFlashesWithGuarantee = function (request, response, flashGuarantee) {
    let SubjectModel = database.Flash();
    SubjectModel.find({ flashGuarantee: flashGuarantee }, null, { sort: { subjectNumber: 1 } }, function (err, subjects) {
        if (err) {
            throw err;
        }
        response.render('flash_table_with_guarantee', { flashes: subjects });
    });
};