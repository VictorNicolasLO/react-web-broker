import * as React from "react";
import useCommandBus from "./use-command-bus";

function useCommandHandler(commandName: string, handler: (data: any) => void) {
  const queryBus = useCommandBus();
  React.useEffect(() => {
    queryBus?.addCommandHandler(commandName, handler);
  });
}

export default useCommandHandler;
