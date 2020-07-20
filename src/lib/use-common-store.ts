import { useState, useEffect, useCallback } from "react";
import { useWebBroker } from "./web-worker-provider";

const valuesDic: any = {};

function useCommonStore(path: string, initValue: string) {
  const webBroker = useWebBroker();
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    (async () => {
      try {
        const result = await webBroker?.queryBus.query(`USE_STORE.${path}`, {});
        if (result) setValue(result);
        else
          webBroker?.queryBus.addGlobalQueryHandler(`USE_STORE.${path}`, () => {
            return valuesDic[path];
          });
      } catch (e) {
        webBroker?.queryBus.addGlobalQueryHandler(`USE_STORE.${path}`, () => {
          return valuesDic[path];
        });
      }
    })();
    webBroker?.eventBus.subscribe(`USE_STORE.${path}`, (value) => {
      setValue(value);
    });
  }, []);
  const setValueAndEmmit = useCallback((value) => {
    webBroker?.eventBus.publish(`USE_STORE.${path}`, value);
  }, []);
  valuesDic[path] = value;
  return [value, setValueAndEmmit];
}

export default useCommonStore;
