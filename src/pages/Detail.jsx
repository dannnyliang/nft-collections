import React from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  return (
    <div>
      Detail Page: {params.id}
      <br />
      <Link to="/collections">to List Page</Link>
    </div>
  );
};

export default Detail;
