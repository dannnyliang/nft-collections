import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function CollectionCard(props) {
  const { className, name, imageUrl } = props;

  return (
    <Card className={className}>
      <CardActionArea className="collection-card">
        <CardMedia
          className="collection-card__image"
          image={imageUrl}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const StyledCollectionCard = styled(CollectionCard)`
  .collection-card {
    &__image {
      height: 120px;
      padding-bottom: 2px;
    }
  }
`;

StyledCollectionCard.propTypes = {
  classname: PropTypes.string,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default StyledCollectionCard;
