"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProps = exports.useWebBroker = exports.WebBrokerProvider = exports.PropsProvider = void 0;
const React = require("react");
const web_broker_1 = require("web-broker");
const webBrokerContext = React.createContext(undefined);
const propsContext = React.createContext(undefined);
function PropsProvider({ children }) {
    const [props, setProps] = React.useState();
    React.useEffect(() => {
        window.addEventListener("message", (message) => {
            if (message.data.type === "props") {
                setProps(message.data.props);
            }
        });
    });
    return (React.createElement(propsContext.Provider, { value: props }, children));
}
exports.PropsProvider = PropsProvider;
function WebBrokerProvider({ children, nodeId, reduxStore, logType, reduxPrefix, }) {
    const [webBroker, setWebBroker] = React.useState();
    React.useEffect(() => {
        setWebBroker(new web_broker_1.WebBroker(nodeId, logType || "none"));
    }, []);
    React.useEffect(() => {
        if (webBroker && reduxStore) {
            webBroker.eventBus.subscribe("REDUX", (action) => {
                reduxStore.dispatch(action);
            });
            const next = reduxStore.dispatch;
            reduxStore.dispatch = function dispatchAndLog(action) {
                if (action.type.startsWith(reduxPrefix || "REDUX_WEB_BROKER")) {
                    webBroker.eventBus.publish("REDUX", action);
                }
                let result = next(action);
                return result;
            };
        }
    }, [webBroker]);
    return (React.createElement(PropsProvider, null,
        React.createElement(webBrokerContext.Provider, { value: webBroker }, webBroker && children)));
}
exports.WebBrokerProvider = WebBrokerProvider;
function useWebBroker() {
    return React.useContext(webBrokerContext);
}
exports.useWebBroker = useWebBroker;
function useProps() {
    return React.useContext(propsContext);
}
exports.useProps = useProps;
//# sourceMappingURL=web-worker-provider.js.map