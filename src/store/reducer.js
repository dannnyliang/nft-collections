import * as eventTypes from "./eventTypes";

export default function reducer(state = {}, event) {
  switch (event.type) {
    case eventTypes.FETCH_COLLECTIONS:
      return state;

    default:
      return state;
  }
}
