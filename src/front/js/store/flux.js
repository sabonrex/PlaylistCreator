import React from "react";

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
      favouritesStore: [],
      favouritePlaylistsStore: [],
      favouriteTracksStore: [],
      nowPlaying: null,
      currentPlaylistSaved: false
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

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

        setStore({favouriteTracksStore : favouriteTracks});
        setStore({favouritePlaylistsStore : favouritePlaylists});
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

      moveToPlaylist: (key, song, songIndex, originalPlaylist, targetPlaylist) => {
        const store = getStore();

        const originalIndexLookup = store.playlistStore.findIndex(plIndex => plIndex.playlistName === originalPlaylist) 
        const targetIndexLookup = store.playlistStore.findIndex(plIndex => plIndex.playlistName === targetPlaylist)

        return (
          playlistData[originalIndexLookup].list.tracks.splice(songIndex, 1),
          playlistData[targetIndexLookup].list.tracks.push(song),
          setStore({[key]: playlistData})
        )
      },

      removeFromPlaylist: (key, songIndex, targetPlaylist) => {
        const store = getStore();

        const indexLookup = store.playlistStore.findIndex(plIndex => plIndex.playlistName === targetPlaylist)

        return (
          playlistData[indexLookup].list.tracks.splice(songIndex, 1),
          setStore({[key]: playlistData})
        )
      },

      addToFavourites: (key, song) => {
        return (
          favouritesData.tracks.unshift(song),
          setStore({[key]: favouritesData})          
        )
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