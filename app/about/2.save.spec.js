import { expect } from 'chai';
import { Server } from './support/server.js';
import { Router } from './support/router.js';
import { page } from './support/page.js';
import { eventually } from './support/eventually.js';
import { payload } from './support/payload.js';
import { asset } from './support/asset.js';

const router = new Router([
    {
        incoming: /GET \//,
        handler: asset('./app/save.html')
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

describe('Saving model', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, router.handler.bind(router));
        server.start(port => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is a json POST', async () => {
        page.set('book title').value = 'TDD';
        page.click('save');

        await eventually(() => expect(page.section('Log')).to.contain('POST /books {\"title\":\"TDD\"}'));
    });
});
