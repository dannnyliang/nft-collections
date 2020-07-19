import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CollectionCard from "../components/CollectionCard";
import { fetchCollections } from "../store/actions";
import { FETCHS_TATUS } from "../store/constant";
import useWeb3 from "../useWeb3";

const isReachBottom = (element) =>
  element.getBoundingClientRect().bottom <= window.innerHeight;

const List = () => {
  const [account, setAccount] = useState();
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections);
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const hasMoreCollections = useSelector((state) => state.hasMoreCollections);
  const listRef = useRef(null);

  const { web3, error } = useWeb3();

  if (error) {
    console.error(error);
  }

  const isFetching = fetchStatus === FETCHS_TATUS.PENDING;

  const trackScrolling = useCallback(() => {
    if (listRef.current) {
      if (
        account &&
        !isFetching &&
        hasMoreCollections &&
        isReachBottom(listRef.current)
      ) {
        dispatch(
          fetchCollections({ owner: account, offset: collections.length })
        );
      }
    }
  }, [account, collections.length, dispatch, hasMoreCollections, isFetching]);

  useEffect(() => {
    if (web3) {
      // eslint-disable-next-line no-unused-expressions
      web3?.eth.getAccounts().then((res) => {
        setAccount(res[0]);
      });
    }
  }, [web3]);

  useEffect(() => {
    if (collections.length === 0 && account) {
      dispatch(fetchCollections({ owner: account }));
    }
  }, [account, collections.length, dispatch]);

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
        <Typography align="center" variant="body1">
          current account: {account}
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
      {!hasMoreCollections && (
        <Typography align="center" variant="body1">
          no more collections
        </Typography>
      )}
    </Container>
  );
};

export default List;
