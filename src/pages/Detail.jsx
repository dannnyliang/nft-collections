import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCollection } from "../store/actions";
import { FETCHS_TATUS } from "../store/constant";
import DetailAppBar from "./DetailAppBar";
import Permalink from "./Permalink";

function Detail() {
  const { contractAddress, tokenId } = useParams();
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection);
  const fetchStatus = useSelector((state) => state.fetchStatus);

  const isFetching = fetchStatus === FETCHS_TATUS.PENDING;

  useEffect(() => {
    if (contractAddress && tokenId) {
      dispatch(fetchCollection({ contractAddress, tokenId }));
    }
  }, [dispatch, contractAddress, tokenId]);

  if (isFetching) {
    return (
      <>
        <DetailAppBar />
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (!collection) {
    return (
      <>
        <DetailAppBar />
        <Container>查無資料，請返回列表頁</Container>
      </>
    );
  }

  return (
    <>
      <DetailAppBar />
      <Container>
        <img src={collection.image_url} alt={collection.name} width="100%" />
        <Typography align="center" variant="h3" gutterBottom>
          {collection.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {collection.description}
        </Typography>
      </Container>
      <Permalink />
    </>
  );
}

export default Detail;
