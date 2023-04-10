import { alignPropType } from "react-bootstrap/esm/types";
import "../../styles/index.css";



<body>
  <div class="tracksmood">
    <button class="track" data-spotify-id="spotify:track:genre:happy">
      Happy 
    </button>
    <button class="track" data-spotify-id="spotify:track:genre:sad">
      Sad
    </button>
    <button class="track" data-spotify-id="spotify:track:genre:hardcore">
      Angery
    </button>
  </div>

  <div id="embed-iframe"></div>
  <script src="https://open.spotify.com/embed/track/iframe-api/v1" async>
  </script>
  <script type="text/javascript">
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '200',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      const callback = (EmbedController) => {
        document.querySelectorAll('.track').forEach(
          track => {
            track.addEventListener('click', () => {
              EmbedController.loadUri(track.dataset.spotifyId)
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };
  </script>
</body>
</html>

curl -X "GET" "https://api.spotify.com/v1/search?q=genre%3Sad&type=track"
curl -X "GET" "https://api.spotify.com/v1/search?q=genre%3Happy&type=track"
curl -X "GET" "https://api.spotify.com/v1/search?q=genre%3Hardcore&type=track"