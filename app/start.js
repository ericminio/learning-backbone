import { serving } from './about/support/serving.js';
const server = serving('./save.html');

server.start(port => {
    console.log(`listening on port ${port}`);
});