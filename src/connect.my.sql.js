const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TimeTrackerDB'
});
module.exports = {
    dbQuery: function(sql, arrayData) {
        if (arrayData) {
            return new Promise(data => {
                db.query(sql, arrayData, function (error, result) {
                    if (!!error) throw error;
                    data({ success: true, result: result });
                });
            });
        }
        return new Promise(data => {
            db.query(sql, function (error, result) {
                if (!!error) throw error;
                data({ success: true, result: result });
            });
        });
    }
};