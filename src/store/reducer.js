import { FETCHS_TATUS } from "./constant";
import * as eventTypes from "./eventTypes";

const initialState = {
  fetchStatus: FETCHS_TATUS.SUCCESS,
  hasMoreCollections: true,
  collections: [],
  collection: null,
};

export default function reducer(state = initialState, event) {
  switch (event.type) {
    case eventTypes.SET_FETCHING_STATUS:
      return {
        ...state,
        fetchStatus: event.status,
      };

    case eventTypes.APPEND_COLLECTIONS:
      return {
        ...state,
        collections: [...state.collections, ...event.collections],
        hasMoreCollections: event.hasMoreCollections,
      };

    case eventTypes.SET_COLLECTION:
      return {
        ...state,
        collection: event.collection,
      };

    default:
      return state;
  }
}
