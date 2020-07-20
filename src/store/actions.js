import { FETCHS_TATUS } from "./constant";
import * as eventTypes from "./eventTypes";

function fetchStart() {
  return { type: eventTypes.SET_FETCHING_STATUS, status: FETCHS_TATUS.PENDING };
}

function fetchSuccess() {
  return { type: eventTypes.SET_FETCHING_STATUS, status: FETCHS_TATUS.SUCCESS };
}

function fetchFail() {
  return { type: eventTypes.SET_FETCHING_STATUS, status: FETCHS_TATUS.FAIL };
}

function appendCollections(collections, hasMoreCollections) {
  return {
    type: eventTypes.APPEND_COLLECTIONS,
    collections,
    hasMoreCollections,
  };
}

function setCollection(collection) {
  return { type: eventTypes.SET_COLLECTION, collection };
}

export function fetchCollections(fetchOptions = {}) {
  const { owner, offset = 0, limit = 20 } = fetchOptions;

  return (dispatch) => {
    dispatch(fetchStart());

    fetch(
      `https://api.opensea.io/api/v1/assets/?format=json&owner=${owner}&offset=${offset}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result || !result.assets) {
          dispatch(fetchFail());
        }

        dispatch(fetchSuccess());
        dispatch(
          appendCollections(result.assets, result.assets.length === limit)
        );
      });
  };
}

export function fetchCollection(fetchOptions) {
  const { contractAddress, tokenId } = fetchOptions;

  return (dispatch) => {
    dispatch(fetchStart());

    fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`)
      .then((response) => response.json())
      .then((result) => {
        if (!result) {
          dispatch(fetchFail());
        }

        dispatch(fetchSuccess());
        dispatch(setCollection(result));
      });
  };
}
