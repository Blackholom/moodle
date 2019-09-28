const url = require('url');
const mysql  = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moodle_db_dev'
});

// CRUD User
// Get list of all students
exports.getAllUsers = function (req, res) {
    conn.query('SELECT u.id,u.dni,u.name,u.state FROM user u', (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": rows}))
    });
};

// Create User
exports.createUser = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const student = { name: reqUrl.query.name, type_id: reqUrl.query.type_id, dni: reqUrl.query.dni, pin: reqUrl.query.pin, created_at: new Date() };

    conn.query('INSERT INTO user SET ?', student, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la creación del registro. ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se creó exitosamente!';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Update User
exports.updateUser = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const name = reqUrl.query.name, type_id = reqUrl.query.type_id, dni = reqUrl.query.dni, pin = reqUrl.query.pin, update = new Date(), state = reqUrl.query.state, id = reqUrl.query.id;
    const updated_at = update.getFullYear() + "-" + (update.getMonth() + 1) + "-" + update.getDate() + " " + update.getHours() + ":" + update.getMinutes() + ":" + update.getSeconds()

    conn.query('UPDATE user u SET u.name = "' + name + '",u.type_id = ' + type_id + ',u.dni = "' + dni + '",u.pin = "' + pin + '",u.updated_at = "' + updated_at.toLocaleString() + '",u.state = ' + state + ' WHERE u.id = ' + id, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la actualización del registro. ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se ha actualizado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Delete User
exports.deleteUser = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;

    conn.query('DELETE FROM user WHERE id = ?', parseInt(id), (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la eliminación del registro. ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro ha sido eliminado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Get user by id
exports.getUserById = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;
    conn.query('SELECT u.dni,u.name,u.state FROM user u WHERE u.id = ?', id, (e, rows) => {
        var error = null;

        if (e){
            error = 'No hay registros con el id indicado. ' + e;
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};

// ------------------------------------------------------------------------------------------------------
// CRUD Subject
// Get list of all subjects
exports.getAllSubject = function (req, res) {
    conn.query('SELECT s.id,s.name,s.description,s.state FROM subject s', (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": rows}))
    });
};

// Create Subject
exports.createSubject = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const subject = { name: reqUrl.query.name, description: reqUrl.query.description, quota: reqUrl.query.quota, created_at: new Date() };

    conn.query('INSERT INTO subject SET ?', subject, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la creación del registro. Error: ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se creó exitosamente!';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Update Subject
exports.updateSubject = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const name = reqUrl.query.name, description = reqUrl.query.description, quota = reqUrl.query.quota, state = reqUrl.query.state, update = new Date(), id = reqUrl.query.id;
    const updated_at = update.getFullYear() + "-" + (update.getMonth() + 1) + "-" + update.getDate() + " " + update.getHours() + ":" + update.getMinutes() + ":" + update.getSeconds()

    conn.query('UPDATE subject SET s.name = "' + name + '",s.description = "' + description + '",s.quota = ' + quota + ',s.state = ' + state + ',s.updated_at = "' + updated_at.toLocaleString() + '" WHERE s.id = ' + id, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la actualización del registro. Error: ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se ha actualizado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Delete Subject
exports.deleteSubject = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;

    conn.query('DELETE FROM subject WHERE id = ?', parseInt(id), (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la eliminación del registro. Error: ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro ha sido eliminado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Get subject by id
exports.getSubjectById = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;
    conn.query('SELECT s.id,s.name,s.description,s.state FROM subject s WHERE s.id = ?', id, (e, rows) => {
        var error = null;

        if (e){
            error = 'No hay registros con el id indicado. Error: ' + e;
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};

exports.getSubjectByTeacher = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const teacher_id = reqUrl.query.id;
    conn.query('SELECT s.id,s.name,s.description,s.state FROM subject s LEFT JOIN user_has_subject uhs ON ' +
        'uhs.subject_id = s.id LEFT JOIN user u ON u.id = uhs.user_id WHERE u.type_id = 1 AND u.id = ?', teacher_id, (e, rows) => {
        var error = null;

        if (e){
            error = 'No hay registros con el id indicado. Error: ' + e;
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};

exports.getSubjectByStudent = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const student_id = reqUrl.query.id;
    conn.query('SELECT s.id,s.name,s.description,s.state FROM subject s LEFT JOIN user_has_subject uhs ON ' +
        'uhs.subject_id = s.id LEFT JOIN user u ON u.id = uhs.user_id WHERE u.type_id = 2 AND u.id = ?', student_id, (e, rows) => {
        var error = null;

        if (e){
            error = 'No hay registros con el id indicado. Error: ' + e;
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};

// ------------------------------------------------------------------------------------------------------
// CRUD User Type
// Get list of all User Type
exports.getAllUserTypes = function (req, res) {
    conn.query('SELECT t.id,t.name,t.description,t.state FROM user_type t', (error, rows) => {
        if (error) throw error;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": rows}))
    });
};

// Create User Type
exports.createUserType = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const subject = { name: reqUrl.query.name, description: reqUrl.query.description, created_at: new Date() };

    conn.query('INSERT INTO user_type SET ?', subject, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la creación del registro.' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se creó exitosamente!';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Update User Type
exports.updateUseType = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const name = reqUrl.query.name, description = reqUrl.query.description, state = reqUrl.query.state, update = new Date(), id = reqUrl.query.id;
    const updated_at = update.getFullYear() + "-" + (update.getMonth() + 1) + "-" + update.getDate() + " " + update.getHours() + ":" + update.getMinutes() + ":" + update.getSeconds()

    conn.query('UPDATE user_type t SET t.name = "' + name + '",t.description = "' + description + '",t.state = ' + state + ',t.updated_at = "' + updated_at.toLocaleString() + '" WHERE t.id = ' + id, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la actualización del registro. ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro se ha actualizado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Delete User Type
exports.deleteUserType = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;

    conn.query('DELETE FROM user_type WHERE id = ?', id, (e, rows) => {
        var result = rows;
        var error = null;

        if (e){
            error = 'Ocurrio un error durante la eliminación del registro. ' + e;
            res.statusCode = 404;
        } else {
            result = 'El registro ha sido eliminado con éxito';
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": 200, "error": error, "response": result}))
    });
};

// Get User Type by id
exports.getUserTypeById = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    const id = reqUrl.query.id;
    conn.query('SELECT t.id,t.name,t.description,t.state FROM user_type t WHERE t.id = ?', id, (e, rows) => {
        var error = null;

        if (e){
            error = 'No hay registros con el id indicado. ' + e;
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
    });
};





// exports.getStudentById = function (req, res) {
//     const reqUrl = url.parse(req.url, true);
//     const student_id = reqUrl.query.id;
//     conn.query('SELECT u.dni,u.name FROM user u WHERE u.type_id = 2 AND u.id = ?', student_id, (error, rows) => {
//         if (error) throw error;
//
//         if (rows.length == 0){
//             error = 'No hay registros con el id indicado'
//             res.statusCode = 404;
//         } else {
//             res.statusCode = 200;
//         }
//
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({"status": res.statusCode, "error": error, "response": rows}))
//     });
// };
//
// // Get list of all students
// exports.getAllStudents = function (req, res) {
//     conn.query('SELECT u.dni,u.name FROM user u WHERE u.type_id = 2', (error, rows) => {
//         if (error) throw error;
//
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({"status": 200, "error": error, "response": rows}))
//     });
// };
//
// exports.testRequest = function (req, res) {
//     body = '';
//
//     req.on('data', function (chunk) {
//         body += chunk;
//     });
//
//     req.on('end', function () {
//
//         postBody = JSON.parse(body);
//
//         var response = {
//             "text": "Post Request Value is  " + postBody.value
//         };
//
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(response));
//     });
// };

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};