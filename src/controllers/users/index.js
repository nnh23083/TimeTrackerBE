const db = require('../../connect.my.sql');

exports.createUserTable = async function(req, res) {
    let sql = 'CREATE TABLE Users(id INT AUTO_INCREMENT,'
    +'fullName VARCHAR(255), birthday VARCHAR(255), email VARCHAR(255), pin INT(5),'
    +'phone INT(15), city VARCHAR(255), hierarchical INT(1),'
    +'position VARCHAR(255), PRIMARY KEY (id))';
    const result = await db.dbQuery(sql);
    res.end(JSON.stringify(result, null, 4));
}

const getDataUserforEmail = async (email) => {
    let sql = `SELECT email FROM Users WHERE email = '${email}'`;
    const result = await db.dbQuery(sql);
    const convertResult = JSON.parse(JSON.stringify(result));
    return convertResult.result.length > 0 ? true : false;
};

exports.create = async function(req, res) {
    let dataUser = req.body;
    let isCheckEmail = getDataUserforEmail(dataUser.email);
    if (isCheckEmail) {
        res.end(JSON.stringify({ success: false, message: 'Email already exists. ' }, null, 4));
    } else {
        let value1 = `(fullName, birthday, email, pin, phone, city, hierarchical, position)`;
        let value2 = `('${dataUser.fullName}', '${dataUser.birthday}', `
        +`'${dataUser.email}', ${dataUser.pin}, ${dataUser.phone}, '${dataUser.city}', `
        +`${dataUser.hierarchical}, '${dataUser.position}')`;
        let sql = `INSERT INTO Users ${value1} VALUES ${value2}`;
        const result = await db.dbQuery(sql);
        res.end(JSON.stringify(result, null, 4));
    }
};

exports.findAll = async function(req, res) {
    let sql = 'SELECT *FROM Users';
    const result = await db.dbQuery(sql);
    res.end(JSON.stringify(result, null, 4));  
};

exports.getDetail = async function(req, res) {
    let id = parseInt(req.query.id);
    let sql = `SELECT * FROM Users WHERE id = ${id}`;
    const result = await db.dbQuery(sql);
    res.end(JSON.stringify(result, null, 4));  
};

exports.update = async function(req, res) {
    let sql = 'UPDATE Users SET ? WHERE id = ?';
    let id = parseInt(req.params.id);
    let updateData = req.body;
    const result = await db.dbQuery(sql, [updateData, id]);
    res.end(JSON.stringify(result, null, 4));
};

exports.delete = async function(req, res) {
	let id = parseInt(req.query.id);
    let sql = `DELETE FROM Users WHERE id = ${id}`;
    const result = await db.dbQuery(sql);
    res.end(JSON.stringify(result, null, 4));  
};
