import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { Link } from "react-router-dom";

function DetailAppBar() {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start">
          <Link to="/collections">
            <ArrowBackIcon fontSize="large" />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default DetailAppBar;
