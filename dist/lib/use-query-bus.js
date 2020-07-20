"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_worker_provider_1 = require("./web-worker-provider");
function useQueryBus() {
    return web_worker_provider_1.useWebBroker()?.queryBus;
}
exports.default = useQueryBus;
//# sourceMappingURL=use-query-bus.js.map