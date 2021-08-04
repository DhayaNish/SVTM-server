module.exports = (app) => {
    const data = require('../controller/test.controller');
    const auth = require('../Middleware/Middleware');

    // Create a new Note
    app.post('/svtm/postdata',auth, data.create);

    // Retrieve all Notes
    app.get('/svtm/getdata', auth,data.findAll);

    // Retrieve a single Note with noteId
    app.get('/svtm/getdatabyid/:_id',auth, data.findOne);

}