import { expect } from 'chai';
import { serving } from './support/serving.js';
import { page } from './support/page.js';
import { eventually } from './support/eventually.js';
const server = serving('./app/save.html');

describe('Saving model', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).finally(done);
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
