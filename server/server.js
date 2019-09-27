const HOSTNAME = '127.0.0.1'
const PORT = 3000;

const server = require('./controller');

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});