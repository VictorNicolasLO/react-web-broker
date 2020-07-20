"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_worker_provider_1 = require("./web-worker-provider");
function useCommandBus() {
    return web_worker_provider_1.useWebBroker()?.commandBus;
}
exports.default = useCommandBus;
//# sourceMappingURL=use-command-bus.js.map