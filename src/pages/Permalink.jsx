import { Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const bottomSpace = 12;

function Permalink(props) {
  const { className } = props;
  return (
    <div className={className}>
      <Box className="space" />
      <div className="float-button">
        <Button variant="contained" color="primary">
          permalink
        </Button>
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
};

export default StyledPermalink;
