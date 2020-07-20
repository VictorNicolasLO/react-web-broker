/// <reference types="react" />
import { WebBroker } from "web-broker";
import { Store } from "redux";
export declare function PropsProvider({ children }: any): JSX.Element;
export declare function WebBrokerProvider({ children, nodeId, reduxStore, logType, reduxPrefix, }: {
    children: any;
    nodeId: string;
    reduxPrefix?: string;
    reduxStore?: Store;
    logType: "debug" | "none";
}): JSX.Element;
export declare function useWebBroker(): WebBroker | undefined;
export declare function useProps(): any;
