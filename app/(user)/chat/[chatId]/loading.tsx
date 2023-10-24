import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React from "react";

const loading = () => {
  return (
    <div className="w-full flex justify-center pt-5">
      <CircularProgress sx={{ color: "#6B46C1 !important" }} />
    </div>
  );
};

export default loading;
