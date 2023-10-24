import CircularProgress from "@mui/joy/CircularProgress/CircularProgress";
import React from "react";

const loading = () => {
  return (
    <div className="w-full felx justify-center">
      <CircularProgress variant="soft" size="md" />
    </div>
  );
};

export default loading;
