"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const use_command_bus_1 = require("./use-command-bus");
function useCommandHandler(commandName, handler) {
    const queryBus = use_command_bus_1.default();
    React.useEffect(() => {
        queryBus?.addCommandHandler(commandName, handler);
    });
}
exports.default = useCommandHandler;
//# sourceMappingURL=use-command-handler.js.map