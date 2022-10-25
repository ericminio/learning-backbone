import { expect } from 'chai';
import { serving } from './support/serving.js';
import { page } from './support/page.js';
import { eventually } from './support/eventually.js';
const server = serving('./app/index.html');

describe('Displaying model', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).finally(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is available for one object', async () => {
        await eventually(() => expect(page.section('Best seller')).to.contain('Clean Code'));
    });
});
