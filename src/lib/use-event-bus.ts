import { useWebBroker } from "./web-worker-provider";

function useEventBus() {
  return useWebBroker()?.eventBus;
}

export default useEventBus;
