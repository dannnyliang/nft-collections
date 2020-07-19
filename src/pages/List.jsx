import React from "react";
import { useDispatch } from "react-redux";

import { fetchCollections } from "../store/actions";

const List = () => {
  const dispatch = useDispatch();

  return (
    <div>
      List Page
      <button onClick={() => dispatch(fetchCollections())}>fetch</button>
    </div>
  );
};

export default List;
