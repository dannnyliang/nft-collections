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

function appendCollections(collections) {
  return { type: eventTypes.APPEND_COLLECTIONS, collections };
}

function setCollection(collection) {
  return { type: eventTypes.SET_COLLECTION, collection };
}

export function fetchCollections(fetchOptions = {}) {
  const {
    owner = "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91",
    offset = 0,
    limit = 20,
  } = fetchOptions;

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
        dispatch(appendCollections(result.assets));
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
