"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const web_worker_provider_1 = require("./web-worker-provider");
const ConnectedIframe = React.forwardRef((iframeAttrs, ref) => {
    const webBroker = web_worker_provider_1.useWebBroker();
    const [loaded, setLoaded] = React.useState(false);
    const onLoad = React.useCallback((ev) => {
        if (ref.current !== null)
            webBroker?.connectChild(ref.current);
        if (iframeAttrs.onLoad)
            iframeAttrs.onLoad(ev);
        setLoaded(true);
    }, []);
    React.useEffect(() => {
        if (loaded) {
            const iframe = ref.current;
            iframe.contentWindow?.postMessage({
                type: "props",
                props: iframeAttrs.props,
            }, "*");
        }
    }, [loaded, iframeAttrs.props]);
    return React.createElement("iframe", Object.assign({ ref: ref }, iframeAttrs, { onLoad: onLoad }));
});
exports.default = ConnectedIframe;
//# sourceMappingURL=connected-iframe.js.map