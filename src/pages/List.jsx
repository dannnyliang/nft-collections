import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import CollectionCard from "../components/CollectionCard";
import { fetchCollections } from "../store/actions";
import { FETCHS_TATUS } from "../store/constant";

const isReachBottom = (element) =>
  element.getBoundingClientRect().bottom <= window.innerHeight;

const List = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections);
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const hasMoreCollections = useSelector((state) => state.hasMoreCollections);
  const listRef = useRef(null);

  const isFetching = fetchStatus === FETCHS_TATUS.PENDING;

  const trackScrolling = useCallback(() => {
    if (listRef.current) {
      if (isReachBottom(listRef.current) && !isFetching && hasMoreCollections) {
        dispatch(fetchCollections({ offset: collections.length }));
      }
    }
  }, [collections.length, dispatch, hasMoreCollections, isFetching]);

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(fetchCollections());
    }
  }, [collections.length, dispatch]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [trackScrolling]);

  return (
    <Container>
      <Box paddingY={3}>
        <Typography align="center" variant="h3">
          收藏品列表
        </Typography>
      </Box>
      <Grid innerRef={listRef} container spacing={3}>
        {collections.map((collection) => (
          <Grid item xs={6} sm={4} md={3}>
            <CollectionCard
              key={collection.token_id}
              tokenId={collection.token_id}
              contractAddress={collection.asset_contract.address}
              name={collection.name}
              imageUrl={collection.image_url}
            />
          </Grid>
        ))}
      </Grid>
      {isFetching && <CircularProgress />}
      {!hasMoreCollections && <div>no more collections</div>}
    </Container>
  );
};

export default List;
