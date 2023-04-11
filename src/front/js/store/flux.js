import { playlistData } from "../component/testDataPlaylist";
import { favouritesData } from "../component/testDataFavourites";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      apiUrl: process.env.BACKEND_URL,
      randomPlaylist: [],
      playlistStore: [],
      favouritesStore: []
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
      
      fetchPlaylist: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${store.apiUrl}/api/spotify/random`);

          if (!response.ok) throw new Error("Something went wrong");
          const jsonResponse = await response.json();
          setStore({ randomPlaylist: jsonResponse?.data || [] });
        } catch {
          window.alert("Something went wrong");
        }
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
      }
    },
  };
};

export default getState;
