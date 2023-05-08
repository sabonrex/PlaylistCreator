import { playlistData } from "../component/testData/testDataPlaylist";
import { favouritesData } from "../component/testData/testDataFavourites";
import { getToken } from "../auth/getToken";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      apiUrl: process.env.BACKEND_URL,
      randomPlaylist: [],
      userId: null, // may not be necessary, or we can use the token instead
      playlistStore: [],
      favPlaylistsStore: [],
      favTracksStore: [],
      nowPlaying: null,
      currentPlaylistSaved: false
    },

    actions: {
      // Use getActions to call a function within a fuction
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      loadSomeData: (key, passedData) => {
				setStore({[key] : passedData})
			},

      // maybe this function needs to be outside the store
      addToDB: async (passedData) => {
        const store = getStore();

        Object.values(passedData).forEach(singleTrack =>
          fetch(process.env.BACKEND_URL + "/api/tracks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(singleTrack)
          })

          // this feels janky but it works
          // automatically updates the random playlist with the ID from the DB
          .then(data => data.json())
          .then(data => {
            store.randomPlaylist.find(entry => entry.spotify_id === singleTrack.spotify_id).db_id = data.db_id
          })
        )
      },

      loadUserFavourites: async () => {
        const actions = getActions();

        const favouriteTracks = await actions.fetchFavouriteTracks();
        const favouritePlaylists = await actions.fetchFavouritePlayists();

        setStore({favTracksStore : favouriteTracks});
        setStore({favPlaylistsStore : favouritePlaylists});
      },

      fetchFavouritePlayists: async () => {
        const store = getStore();
        const token = getToken();
        const endpoint = store.apiUrl + "/api/user/favourites/playlists";

        try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          if (!response.ok) return [] 
          const jsonResponse = await response.json();
          return jsonResponse;
        } catch(error) {
          console.error(error)
        }
      },

      fetchFavouriteTracks: async () => {
        const store = getStore();
        const token = getToken();
        const endpoint = store.apiUrl + "/api/user/favourites/tracks";

        try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
          });
          if (!response.ok) return []
          const jsonResponse = await response.json()
          return jsonResponse
        } catch(error) {
          console.error(error)
        }
      },
      
      fetchPlaylist: async () => {
        const store = getStore();

        try {
          const response = await fetch(`${store.apiUrl}/api/spotify/random`);

          if (!response.ok) throw new Error("Something went wrong");
          const jsonResponse = await response.json();
          
          setStore({ randomPlaylist: jsonResponse || [] });
          setStore({ defaultFooter: null})

        } catch(error) {
          console.error(error);
        }
      },

      addUserFavouriteTrack: async (trackId) => {
        const store = getStore();
        const token = getToken();
        const endpoint = `${store.apiUrl}/api/user/favourites/tracks/${trackId}`

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
          });

          const jsonResponse = await response.json()
          return jsonResponse

        } catch (error) {
          console.error(error)
        }
      },

      saveRandomPlaylist: async () => {
        const store = getStore();
        
        // this function will create a new empty playlist each time "save this playlist is clicked"
        const newPlaylist = await fetch(`${process.env.BACKEND_URL}/api/playlists/`, 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          } 
        )

        const newPlaylistID = await newPlaylist.json()

        Object.values(store.randomPlaylist).forEach(entry => {
          fetch(`${process.env.BACKEND_URL}/api/playlists/${newPlaylistID.playlist_id}/tracks/${entry.db_id}`, 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          })
          // uncomment to check if tracks are being added correctly
          // .then(response => response.json())
          // .then(response => console.log(response))             
        })
      },
      
      addToPlaylist: (key, song, targetPlaylist) => {
        const store = getStore();

        const indexLookup = store.playlistStore.findIndex(plIndex => plIndex.playlistName === targetPlaylist)

        return (
          playlistData[indexLookup].list.tracks.push(song),
          setStore({[key]: playlistData})
        )
      },

      moveTrackBetweenPlaylistsInStore: async (track, originalPlaylistId, targetPlaylistId) => {
        const actions = getActions();

        actions.removeTrackFromPlaylistInStore(originalPlaylistId, track.id);
        actions.addTrackToPlaylistInStore(targetPlaylistId, track)
      },

      moveTrackBetweenPlaylists: async (track, originalPlaylistId, targetPlaylistId) => {
        const store = getStore();
        const endpoint = `${store.apiUrl}/api/playlists/${originalPlaylistId}/tracks/${track.id}/playlists/${targetPlaylistId}/move`;

        try {
          const response = await fetch(endpoint, {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
          });
          const jsonResponse = await response.json();
          console.log(jsonResponse.msg);
          return jsonResponse;
          
        } catch(error) {
          console.error(error);
        }

      },

      addTrackToPlaylistInStore: (playlistId, track) => {
        const store = getStore();

        const indexP = store.favPlaylistsStore.findIndex(p => p.id === playlistId);        
        const updatedPlaylist = store.favPlaylistsStore[indexP];
        updatedPlaylist.tracks.push(track)
        
        const updateFavouritePlaylists = store.favPlaylistsStore;
        updateFavouritePlaylists[indexP] = updatedPlaylist;
        
        setStore({["favPlaylistsStore"]: updateFavouritePlaylists}) 
      },

      removeTrackFromPlaylistInStore: (playlistId, trackId) => {
        const store = getStore();

        const indexP = store.favPlaylistsStore.findIndex(p => p.id === playlistId);        
        const updatedPlaylist = store.favPlaylistsStore[indexP];
        updatedPlaylist.tracks = store.favPlaylistsStore[indexP].tracks.filter(t => t.id != trackId);
        
        const updateFavouritePlaylists = store.favPlaylistsStore;
        updateFavouritePlaylists[indexP] = updatedPlaylist;
        
        setStore({["favPlaylistsStore"]: updateFavouritePlaylists}) 
      },

      removeTrackFromPlaylist: async (playlistId, trackId) => {
        const store = getStore();
        const endpoint = `${store.apiUrl}/api/playlists/${playlistId}/tracks/${trackId}`;

        try {
          const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
          });
          const jsonResponse = await response.json();
          console.log(jsonResponse.msg);

        } catch(error) {
          console.error(error);
        }
      },

      addTrackToFavouriteTracksInStore: (track) => {
        const store = getStore();

        const updatedTracks = store.favTracksStore;
        updatedTracks.push(track);
        
        setStore({["favTracksStore"]: updatedTracks}) 
      },

      addTrackToFavouriteTracks: async (track) => {
        const store = getStore();
        const token = getToken();
        const endpoint = `${store.apiUrl}/api/user/favourites/tracks/${track.id}`;

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
          });
          const jsonResponse = await response.json()
          console.log(jsonResponse.msg);

        } catch(error) {
          console.error(error);
        }

      },

      removePlaylistFromStore: (playlistId) => {
        const store = getStore();

        const indexP = store.favPlaylistsStore.findIndex(p => p.id == playlistId);
        const updatingP = store.favPlaylistsStore;
        updatingP.splice(indexP, 1);
        
        setStore({["favPlaylistsStore"]: updatingP}) 

      },

      removePlaylist: async (playlistId) => {
        const store = getStore();
        const endpoint = `${store.apiUrl}/api/playlists/${playlistId}`;

        try {
          const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
          });
          const jsonResponse = await response.json();
          console.log(jsonResponse.msg);
        } catch(error) {
          console.error(error);
        }
      },

      removeFromFavourites: (key, index) => {
        return (
          favouritesData.tracks.splice(index, 1),
          setStore({[key]: favouritesData})
        )
      },

      getSpotifyTrack: () => {
        const store = getStore();
        // in the future, return the last song the user was hearing. For now, return a song
        if (store.randomPlaylist.length === 0) return "7sqii6BhIDpJChYpU3WjwS";
        else return store.randomPlaylist[0]["id"]
      },

      setNowPlaying: (trackID) => {
        return (
          setStore({"nowPlaying": trackID})
        )
      },

      setSavedPlaylist: (val) => {
        return(
          setStore({"currentPlaylistSaved": val})
        )
      }
    },
  };
};

export default getState;