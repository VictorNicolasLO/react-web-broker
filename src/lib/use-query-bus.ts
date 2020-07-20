import * as React from "react";
import { useWebBroker } from "./web-worker-provider";

function useQueryBus() {
  return useWebBroker()?.queryBus;
}

export default useQueryBus;
