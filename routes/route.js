module.exports = (app) => {
    const data = require('../controller/test.controller');

    // Create a new Note
    app.post('/svtm/postdata', data.create);

    // Retrieve all Notes
    app.get('/svtm/getdata', data.findAll);

    // Retrieve a single Note with noteId
    app.get('/svtm/getdatabyid/:_id', data.findOne);

}