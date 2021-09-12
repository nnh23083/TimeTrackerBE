module.exports = function(app) {

    var users = require('../../controllers/users');

    app.get('/createUsersTable', users.createUserTable)
    // Create a new
    app.post('/api/users', users.create);

    // Retrieve all
    app.get('/api/users', users.findAll);

    // Retrieve a single by Id
    app.get('/api/getDetailUser', users.getDetail);

    // Update a with Id
    app.put('/api/updateUser/:id', users.update);

    // Delete a with Id
    app.delete('/api/deleteUser', users.delete);
}