export class Router {
    constructor(routes) {
        this.routes = routes;
    }
    handler(request, response) {
        let incoming = `${request.method} ${request.url}`;
        let route = this.routes.find(route => route.incoming.test(incoming));
        route.handler(request, response);
    }
}