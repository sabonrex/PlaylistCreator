import "../../styles/index.css";



<body>
  <div class="episodes">
    <button class="episode" data-spotify-id="spotify:episode:7makk4oTQel546B0PZlDM5">
      My Path to Spotify: Women in Engineering
    </button>
    <button class="episode" data-spotify-id="spotify:episode:43cbJh4ccRD7lzM2730YK3">
      What is Backstage?
    </button>
    <button class="episode" data-spotify-id="spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV">
      Introducing Nerd Out@Spotify
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
        document.querySelectorAll('.episode').forEach(
          episode => {
            episode.addEventListener('click', () => {
              EmbedController.loadUri(episode.dataset.spotifyId)
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };
  </script>
</body>
</html>
