import * as React from "react";
import useEventBus from "./use-event-bus";

function useSubscribe(topic: string, handler: (data: any) => void) {
  const eventBus = useEventBus();
  React.useEffect(() => {
    eventBus?.subscribe(topic, handler);
  });
}

export default useSubscribe;
