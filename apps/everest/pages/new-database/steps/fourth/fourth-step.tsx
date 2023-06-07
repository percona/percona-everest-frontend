import { Typography } from "@mui/material";
import React from "react";
import { Messages } from "./fourth-step.messages";

export const FourthStep = () => {
  return (
    <>
      <Typography variant="h6">{Messages.externalAccess}</Typography>
      <Typography variant="caption">{Messages.caption}</Typography>
    </>
  );
}
