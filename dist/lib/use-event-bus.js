"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_worker_provider_1 = require("./web-worker-provider");
function useEventBus() {
    return web_worker_provider_1.useWebBroker()?.eventBus;
}
exports.default = useEventBus;
//# sourceMappingURL=use-event-bus.js.map