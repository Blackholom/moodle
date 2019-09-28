const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    const service = require('./service');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/user' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllUsers(req, res);
    } else if (reqUrl.pathname == '/user/new' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.createUser(req, res);
    } else if (reqUrl.pathname == '/user/edit' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.updateUser(req, res);
    } else if (reqUrl.pathname == '/user/delete' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteUser(req, res);
    } else if (reqUrl.pathname == '/user/show' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUserById(req, res);
    } else if (reqUrl.pathname == '/subject' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllSubject(req, res);
    } else if (reqUrl.pathname == '/subject/new' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.createSubject(req, res);
    } else if (reqUrl.pathname == '/subject/edit' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.updateSubject(req, res);
    } else if (reqUrl.pathname == '/subject/delete' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteSubject(req, res);
    } else if (reqUrl.pathname == '/subject/show' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getSubjectById(req, res);
    } else if (reqUrl.pathname == '/userType' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllUserTypes(req, res);
    } else if (reqUrl.pathname == '/userType/new' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.createUserType(req, res);
    } else if (reqUrl.pathname == '/userType/edit' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.updateUseType(req, res);
    } else if (reqUrl.pathname == '/userType/delete' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteUserType(req, res);
    } else if (reqUrl.pathname == '/userType/show' && req.method === 'GET'){
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUserTypeById(req, res);
    } else if (reqUrl.pathname == '/test' && req.method === 'POST') {
        // TODO
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});