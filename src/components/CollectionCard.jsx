import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function CollectionCard(props) {
  const { className, name, imageUrl, contractAddress, tokenId } = props;

  return (
    <Card className={className}>
      <Link to={`/collections/${contractAddress}/${tokenId}`}>
        <CardActionArea>
          <CardMedia
            className="collection-card-image"
            image={imageUrl}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

const StyledCollectionCard = styled(CollectionCard)`
  .collection-card-image {
    height: 120px;
    padding-bottom: 2px;
  }
`;

StyledCollectionCard.propTypes = {
  classname: PropTypes.string,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  tokenId: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
};

export default StyledCollectionCard;
