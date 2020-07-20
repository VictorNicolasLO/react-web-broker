"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const web_worker_provider_1 = require("./web-worker-provider");
const valuesDic = {};
function useCommonStore(path, initValue) {
    const webBroker = web_worker_provider_1.useWebBroker();
    const [value, setValue] = react_1.useState(initValue);
    react_1.useEffect(() => {
        (async () => {
            try {
                const result = await webBroker?.queryBus.query(`USE_STORE.${path}`, {});
                if (result)
                    setValue(result);
                else
                    webBroker?.queryBus.addGlobalQueryHandler(`USE_STORE.${path}`, () => {
                        return valuesDic[path];
                    });
            }
            catch (e) {
                webBroker?.queryBus.addGlobalQueryHandler(`USE_STORE.${path}`, () => {
                    return valuesDic[path];
                });
            }
        })();
        webBroker?.eventBus.subscribe(`USE_STORE.${path}`, (value) => {
            setValue(value);
        });
    }, []);
    const setValueAndEmmit = react_1.useCallback((value) => {
        webBroker?.eventBus.publish(`USE_STORE.${path}`, value);
    }, []);
    valuesDic[path] = value;
    return [value, setValueAndEmmit];
}
exports.default = useCommonStore;
//# sourceMappingURL=use-common-store.js.map