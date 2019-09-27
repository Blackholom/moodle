const url = require('url');
const mysql  = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moodle_db_dev'
});

exports.getAllUsers = function (req, res) {
    conn.query('SELECT * FROM user', (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": null, "response": rows}))
    });
};

exports.getAllStudents = function (req, res) {
    conn.query('SELECT u.dni,u.name FROM user u WHERE u.type_id = 2', (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": rows}))
    });
};

exports.createStudent = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const student = { name: reqUrl.query.name, type_id: 2, dni: reqUrl.query.dni, created_at: new Date() };

    conn.query('INSERT INTO user SET ?', student, (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": null, "response": rows}))
    });
};

exports.getStudentById = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const student_id = reqUrl.query.id;
    conn.query('SELECT u.dni,u.name FROM user u WHERE u.type_id = 2 AND u.id = ?', student_id, (error, rows) => {
        if (error) throw error;

        if (rows.length == 0){
            error = 'No hay registros con el id indicado'
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};

exports.testRequest = function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.value
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};