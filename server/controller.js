const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    const service = require('./service');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/students' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllStudents(req, res);
    } else if (reqUrl.pathname == '/students/new' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.createStudent(req, res);
    } else if (reqUrl.pathname == '/students/show' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getStudentById(req, res);
    } else if (reqUrl.pathname == '/test' && req.method === 'POST') {
        // TODO
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});