import fs from 'fs';

export const asset = (file) => (request, response) => {
    const html = fs.readFileSync(file).toString();
    response.setHeader('Content-Length', html.length);
    response.setHeader('Content-Type', 'text/html');
    response.end(html);
};
