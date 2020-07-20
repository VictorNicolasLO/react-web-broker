import * as React from "react";
import { useWebBroker } from "./web-worker-provider";

const ConnectedIframe = React.forwardRef(
  (
    iframeAttrs: React.IframeHTMLAttributes<HTMLIFrameElement> & { props: any },
    ref
  ) => {
    const webBroker = useWebBroker();
    const [loaded, setLoaded] = React.useState(false);
    const onLoad = React.useCallback((ev) => {
      if ((ref as any).current !== null)
        webBroker?.connectChild(
          ((ref as any).current as unknown) as HTMLIFrameElement
        );
      if (iframeAttrs.onLoad) iframeAttrs.onLoad(ev);
      setLoaded(true);
    }, []);

    React.useEffect(() => {
      if (loaded) {
        const iframe = ((ref as any).current as unknown) as HTMLIFrameElement;
        iframe.contentWindow?.postMessage(
          {
            type: "props",
            props: iframeAttrs.props,
          },
          "*"
        );
      }
    }, [loaded, iframeAttrs.props]);

    return <iframe ref={ref as any} {...iframeAttrs} onLoad={onLoad} />;
  }
);

export default ConnectedIframe;
