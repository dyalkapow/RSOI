const express = require('express');
const app = express();
const port = 3000;

const database = require('./database');
const addFlash = require('./addFlash.js');
const getFlash = require('./getFlashes');
const deleteFlash = require('./deleteFlash');
const editFlash = require('./editFlash');


app.set('views', '../views');
app.set('view engine', 'pug');

app.use(express.static('resources'));
app.use(express.urlencoded());

app.get('/', (request, response) => {
    getFlash.getFlashes(request, response);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening')
});


app.get('/add-flash', (request, response) => {
    response.render('add_flash');
});


app.post('/add-flash-post', (request, response) => {
    addFlash.addFlash(request.body.flashMaker, request.body.flashMemory,
        request.body.flashGuarantee, request.body.flashCount);
    response.redirect('/');
});

app.post('/delete-flash', (request, response) => {
    deleteFlash.deleteFlash(request.body.flashId);
    response.redirect('/');
});

app.post('/delete-flash-by-guarantee', (request, response) => {
    console.log(request.body.flashGuarantee);
    deleteFlash.deleteFlashByGuarantee(request.body.flashGuarantee);
    response.redirect('/');
});

app.get('/flashes-with-guarantee', (request, response) => {
    response.render('flash_table_with_guarantee', {flashes: {}});
});

app.get('/flashes-with-guarantee-get', (request, response) => {
    console.log("here");
    console.log(request.query.flashGuarantee);

    getFlash.getFlashesWithGuarantee(request, response, request.query.flashGuarantee);
});


app.get('/edit-flash', (request, response) => {
    let SubjectModel = database.Flash();
    SubjectModel.findOne({_id: request.query._id}, function (err, flash) {
        if (err) {
            throw err;
        }
        response.render('edit_flash', {flash: flash});
    });
});

app.post('/edit-flash-post', (request, response) => {
    editFlash.editFlash(request.body._id, request.body.flashMaker,
        request.body.flashMemory, request.body.flashGuarantee, request.body.flashCount);
    response.redirect('/');
});