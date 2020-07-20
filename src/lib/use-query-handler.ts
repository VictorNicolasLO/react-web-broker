import * as React from "react";
import useQueryBus from "./use-query-bus";

function useQueryHandler(queryName: string, handler: (data: any) => void) {
  const queryBus = useQueryBus();
  React.useEffect(() => {
    queryBus?.addQueryHandler(queryName, handler);
  });
}

export default useQueryHandler;
