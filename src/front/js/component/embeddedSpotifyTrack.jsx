import React, { useContext, useEffect, useRef } from "react";

const EmbeddedSpotify = ({ trackId }) => {
  const iframeRef = useRef(null);
  const embedControllerRef = useRef(null);

  useEffect(() => {
    if (embedControllerRef.current) {
      embedControllerRef.current.loadUri(`spotify:track:${trackId}`);
      embedControllerRef.current.togglePlay();
    }
  }, [trackId]);

  useEffect(() => {
    if (trackId && !embedControllerRef.current) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      script.async = true;

      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = iframeRef.current;

        if (element) {
          const options = {
            width: "80%",
            height: "100",
            uri: `spotify:track:${trackId}`,
          };
          const callback = (EmbedController) => {
            embedControllerRef.current = EmbedController;
            embedControllerRef.current.togglePlay();
          };
          IFrameAPI.createController(element, options, callback);
        }
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [trackId]);

  return (
    <div>
      <div ref={iframeRef}></div>
    </div>
  );
}

export default EmbeddedSpotify;