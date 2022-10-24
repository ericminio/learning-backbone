import { Server } from './server.js';
import fs from 'fs';

export const serving = (file) => {
    const content = fs.readFileSync(file).toString();
    return new Server(5001, (request, response) => {
        response.setHeader('Content-Length', content.length);
        response.setHeader('Content-Type', 'text/html');
        response.end(content);
    });
};