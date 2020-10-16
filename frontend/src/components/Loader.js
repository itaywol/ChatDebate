import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const Loader = ({ label }) => {
  return (
    <div
      style={{
        display: "flex",
        color: '#fff',
        flexDirection: 'column',
        background: "#00000060",
        position: 'fixed',
        zIndex: 99999999,
        top: 0,
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography style={{marginBottom: 10}}>{label}</Typography>
      <CircularProgress />
      
    </div>
  );
};

export default Loader;
