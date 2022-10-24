import http from 'http';

export class Server {
    constructor(port, handler) {
        this.sockets = [];
        this.port = port;
        this.internal = http.createServer();
        this.internal.on('connection', (socket) => {
            this.sockets.push(socket);
            socket.on('close', () => {
                this.sockets.splice(this.sockets.indexOf(socket), 1);
            });
        });
        this.handler = handler || this.notImplemented;
        this.use(this.handler);
    }
    start(done) {
        this.internal.listen(this.port, () => done(this.port));
    }
    stop(done) {
        this.sockets.forEach(socket => socket.destroy());
        this.internal.close(done);
    }
    use(handler) {
        this.internal.removeListener('request', this.handler);
        this.handler = handler;
        this.internal.on('request', this.handler);
    }

    notImplemented(incoming, response) {
        response.writeHead(501, { 'content-Type': 'text/plain' });
        response.end('NOT IMPLEMENTED');
    }
};