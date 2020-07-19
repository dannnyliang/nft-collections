import * as eventTypes from "./eventTypes";

export function fetchCollections() {
  return { type: eventTypes.FETCH_COLLECTIONS };
}
