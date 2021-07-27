module.exports = (app) => {
    const data = require('../controller/user.controller');

    // Create a new Note
    // app.post('/svtm/login', data.login);

    // Retrieve a single Note with noteId
    app.post('/svtm/register', data.register);

    app.post('/svtm/login',data.login);
}