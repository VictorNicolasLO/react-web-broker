import { useWebBroker } from "./web-worker-provider";

function useCommandBus() {
  return useWebBroker()?.commandBus;
}

export default useCommandBus;
