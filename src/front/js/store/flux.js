import { playlistData } from "../component/testDataPlaylist";
import { favoritesData } from "../component/testDataFavorites";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      apiUrl: process.env.BACKEND_URL,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      randomPlaylist: [],
      playlistStore: [],
      favoritesStore: []
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
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
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
          setStore({[key]: playlistData}), 
          console.log(`${song} is added to ${targetPlaylist}`),
          console.log("store: ", store.playlistStore[indexLookup].list.tracks),
          console.log("db: ", playlistData[indexLookup].list.tracks)
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

      addToFavorites: (key, song) => {
        const store = getStore();
        return (
          favoritesData.tracks.unshift(song),
          setStore({[key]: favoritesData})          
        )
      },

      removeFromFavorites: (key, song, index) => {
        const store = getStore();
        return (
          favoritesData.tracks.splice(index, 1),
          console.log(`${song} is removed from Favorites`),
          setStore({[key]: favoritesData}),
          console.log("db: ", favoritesData),
          console.log("store: ", store.favoritesStore)
        )
      }

    },
  };
};

export default getState;
