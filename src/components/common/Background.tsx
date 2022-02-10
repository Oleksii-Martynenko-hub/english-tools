import React from "react";

const Background: React.FC = () => {
  return (
    <div
      style={{
        zIndex: -1,
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src="/assets/img/ny.jpeg"
        alt="background"
        style={{ width: "101.65%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Background;
