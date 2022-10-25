import { Router } from "./about/support/router.js";
import { Server } from "./about/support/server.js";
import fs from 'fs';
import { payload } from './about/support/payload.js';

const router = new Router([
    {
        incoming: /GET \//,
        handler: (request, response) => {
            const html = fs.readFileSync('./save.html').toString();
            response.setHeader('Content-Length', html.length);
            response.setHeader('Content-Type', 'text/html');
            response.end(html);
        }
    },
    {
        incoming: /POST \/books/,
        handler: async (request, response) => {
            let incoming = await payload(request);
            let answer = JSON.stringify({ data: `${request.method} ${request.url} ${incoming}` });
            response.setHeader('Content-Length', answer.length);
            response.setHeader('Content-Type', 'application/json');
            response.end(answer);
        }
    }
]);

const server = new Server(5001, router.handler.bind(router));

server.start(port => {
    console.log(`listening on port ${port}`);
});