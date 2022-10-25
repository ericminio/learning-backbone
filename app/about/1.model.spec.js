import { expect } from 'chai';
import { Server } from './support/server.js';
import { Router } from './support/router.js';
import { page } from './support/page.js';
import { eventually } from './support/eventually.js';
import { asset } from './support/asset.js';

const router = new Router([
    {
        incoming: /GET \//,
        handler: asset('./app/index.html')
    }
]);
describe('Displaying model', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, router.handler.bind(router));
        server.start(port => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    }); afterEach(done => {
        server.stop(done);
    });

    it('is available for one object', async () => {
        await eventually(() => expect(page.section('Best seller')).to.contain('Clean Code'));
    });
});
