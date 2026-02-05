import { useEffect, useReducer } from "react";
import { DEFAULT_STATE, loadState, saveState } from "../utils/storage";

const initialState = loadState();

const reducer = (state, action) => {
  switch (action.type) {
    case "setVisited":
      return { ...state, visited: action.payload };
    case "setWishlist":
      return { ...state, wishlist: action.payload };
    case "setSelectedContinent":
      return { ...state, selectedContinent: action.payload };
    case "setShowList":
      return { ...state, showList: action.payload };
    case "setStatusMode":
      return { ...state, statusMode: action.payload };
    case "setListTab":
      return { ...state, listTab: action.payload };
    case "reset":
      return { ...DEFAULT_STATE };
    case "hydrate":
      return { ...DEFAULT_STATE, ...action.payload };
    default:
      return state;
  }
};

export const useTravelTracker = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setVisited = (visited) =>
    dispatch({ type: "setVisited", payload: visited });
  const setWishlist = (wishlist) =>
    dispatch({ type: "setWishlist", payload: wishlist });
  const setSelectedContinent = (continent) =>
    dispatch({ type: "setSelectedContinent", payload: continent });
  const setShowList = (show) => dispatch({ type: "setShowList", payload: show });
  const setStatusMode = (mode) =>
    dispatch({ type: "setStatusMode", payload: mode });
  const setListTab = (tab) => dispatch({ type: "setListTab", payload: tab });
  const resetState = () => dispatch({ type: "reset" });
  const hydrate = (payload) => dispatch({ type: "hydrate", payload });

  return {
    state,
    setVisited,
    setWishlist,
    setSelectedContinent,
    setShowList,
    setStatusMode,
    setListTab,
    resetState,
    hydrate,
  };
};
