import { Server } from './server.js';
import fs from 'fs';
import { payload } from './payload.js';

export const serving = (file) => {
    const content = fs.readFileSync(file).toString();
    return new Server(5001, async (request, response) => {
        if (request.url === '/') {
            response.setHeader('Content-Length', content.length);
            response.setHeader('Content-Type', 'text/html');
            response.end(content);
        }
        else {
            let incoming = await payload(request);
            let answer = JSON.stringify({ data:`${request.method} ${request.url} ${incoming}` });
            response.setHeader('Content-Length', answer.length);
            response.setHeader('Content-Type', 'application/json');
            response.end(answer);
        }
    });
};


