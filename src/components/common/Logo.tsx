import React from "react";

interface Props {
  sizePercent: number;
}

const Logo: React.FC<Props> = ({ sizePercent = 100 }) => {
  return (
    <img
      style={{
        opacity: 0.8,
        borderRadius: "10px",
        transition: "all 0.2s",
      }}
      alt=""
      src="/assets/img/logo.png"
      width={(240 / 100) * sizePercent}
      height={(200 / 100) * sizePercent}
      className="d-inline-block align-top"
    />
  );
};

export default Logo;
