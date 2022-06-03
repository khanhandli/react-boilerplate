import React from "react";
import loader from "@/assets/images/loader.gif";

const CircularProgress = ({ className }) => (
  <div className={`${className}`}>
    <img
      height="90"
      className="rotate"
      style={{ borderRadius: "999px" }}
      src={loader.src}
      alt="loader"
    />
  </div>
);
export default CircularProgress;
