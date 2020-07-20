"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const use_query_bus_1 = require("./use-query-bus");
function useQueryHandler(queryName, handler) {
    const queryBus = use_query_bus_1.default();
    React.useEffect(() => {
        queryBus?.addQueryHandler(queryName, handler);
    });
}
exports.default = useQueryHandler;
//# sourceMappingURL=use-query-handler.js.map