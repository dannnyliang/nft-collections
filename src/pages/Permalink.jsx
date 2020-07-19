import { Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const bottomSpace = 12;

function Permalink(props) {
  const { className, url } = props;
  return (
    <div className={className}>
      <Box className="space" />
      <div className="float-button">
        <a target="__blank" href={url}>
          <Button variant="contained" color="primary">
            permalink
          </Button>
        </a>
      </div>
    </div>
  );
}

const StyledPermalink = styled(Permalink)`
  .space {
    height: ${bottomSpace * 5}px;
  }
  .float-button {
    position: fixed;
    bottom: ${bottomSpace}px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

StyledPermalink.propTypes = {
  classname: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default StyledPermalink;
