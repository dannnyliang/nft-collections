import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CollectionCard from "../components/CollectionCard";
import { fetchCollections } from "../store/actions";
import { FETCHS_TATUS } from "../store/constant";

const List = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections);
  const fetchStatus = useSelector((state) => state.fetchStatus);

  const isFetching = fetchStatus === FETCHS_TATUS.PENDING;

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(fetchCollections());
    }
  }, [collections.length, dispatch]);

  return (
    <Container>
      <Typography align="center" variant="h3">
        收藏品列表
      </Typography>
      <Grid container spacing={3}>
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
    </Container>
  );
};

export default List;
