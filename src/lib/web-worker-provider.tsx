import * as React from "react";
import { WebBroker } from "web-broker";
import { Store } from "redux";
const webBrokerContext = React.createContext<WebBroker | undefined>(undefined);
const propsContext = React.createContext<any>(undefined);

export function PropsProvider({ children }: any) {
  const [props, setProps] = React.useState();
  React.useEffect(() => {
    window.addEventListener("message", (message) => {
      if (message.data.type === "props") {
        setProps(message.data.props);
      }
    });
  });
  return (
    <propsContext.Provider value={props}>{children}</propsContext.Provider>
  );
}

export function WebBrokerProvider({
  children,
  nodeId,
  reduxStore,
  logType,
  reduxPrefix,
}: {
  children: any;
  nodeId: string;
  reduxPrefix?: string;
  reduxStore?: Store;
  logType: "debug" | "none";
}) {
  const [webBroker, setWebBroker] = React.useState<WebBroker>();
  React.useEffect(() => {
    setWebBroker(new WebBroker(nodeId, logType || "none"));
  }, []);
  React.useEffect(() => {
    if (webBroker && reduxStore) {
      webBroker.eventBus.subscribe("REDUX", (action) => {
        reduxStore.dispatch(action);
      });
      const next = reduxStore.dispatch;
      reduxStore.dispatch = function dispatchAndLog(action) {
        if (
          (action.type as string).startsWith(reduxPrefix || "REDUX_WEB_BROKER")
        ) {
          webBroker.eventBus.publish("REDUX", action);
        }
        let result = next(action);
        return result;
      };
    }
  }, [webBroker]);
  return (
    <PropsProvider>
      <webBrokerContext.Provider value={webBroker}>
        {webBroker && children}
      </webBrokerContext.Provider>
    </PropsProvider>
  );
}

export function useWebBroker() {
  return React.useContext(webBrokerContext);
}

export function useProps() {
  return React.useContext(propsContext);
}
