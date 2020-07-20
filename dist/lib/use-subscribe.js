"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const use_event_bus_1 = require("./use-event-bus");
function useSubscribe(topic, handler) {
    const eventBus = use_event_bus_1.default();
    React.useEffect(() => {
        eventBus?.subscribe(topic, handler);
    });
}
exports.default = useSubscribe;
//# sourceMappingURL=use-subscribe.js.map