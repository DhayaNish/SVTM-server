module.exports = (app) => {
    const data = require('../controller/user.controller');
    const auth = require('../Middleware/Middleware');

    // Create a new Note
    // app.post('/svtm/login', data.login);

    // Retrieve a single Note with noteId
    app.post('/svtm/register', data.register);

    app.post('/svtm/login',data.login);
    app.get('/svtm/user',auth,data.user);
}