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
      {console.log(trackId)}
      {/* <iframe 
              className="spotify_embed"
              style={{ borderRadius:"12px" }}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
              width="100%" height="85" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe> */}
    </div>
  );
}

export default EmbeddedSpotify;



// const spotifyApi = new SpotifyWebApi();

// function EmbeddedSpotify() {
//   const {store, actions} = useContext(Context)
//   const playerRef = useRef(null);
//   spotifyApi.setAccessToken(actions.getAccessToken)
  
//   useEffect(() => {
//     const player = playerRef.current;
    
//     player.src = `https://open.spotify.com/embed/track/${store.nowPlaying}`;
//     player.allow = 'autoplay';

//     // Play the player automatically
//     player.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://open.spotify.com');

//     const onLoad = () => {
//       player.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://open.spotify.com');
//     };

//     player.addEventListener('load', onLoad);

//     return () => {
//       // Pause the player when the component unmounts
//       player.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), 'https://open.spotify.com');
//       player.removeEventListener('load', onLoad);
//     };
//   }, [store.nowPlaying]);

//   return (
//     <iframe
//       ref={playerRef}
//       width="100%"
//       height="300"
//       frameBorder="0"
//       allowtransparency="true"
//       allow="encrypted-media"
//     />
//   );
// }

// export default EmbeddedSpotify;

{/* <iframe 
              className="spotify_embed"
              style={{ borderRadius:"12px" }}
              src={`https://open.spotify.com/embed/track/${store.nowPlaying}?utm_source=generator`}
              width="100%" height="85" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe> */}