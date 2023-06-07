import { Typography } from "@mui/material";
import React from "react";

export const FourthStep = () => {
  return (
    <>
      <Typography variant="h6">External Access</Typography>
      <Typography variant="caption">
        Exposing your database to the internet poses severe risks, including unauthorized access, data breaches,
        theft of sensitive information, data manipulation, compliance violations, legal consequences, and reputational damage.
        Secure your database with strong controls, encryption, and firewalls. Use secure remote access, regularly back up data, and conduct security audits.
      </Typography>
    </>
  );
}
