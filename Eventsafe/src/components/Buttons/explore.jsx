import { Button } from "@mui/material";
import React from "react";

const ExploreButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "inline-block",
        position: "relative",
        marginTop: "2em",
        padding: "0.8em 1.4em",
        paddingRight: "4.7em",
        background: "transparent",
        border: "2px solid #800080",
        borderRadius: "20px",
        color: "white",
        fontSize: "1em",
        transition: "0.2s",
        minWidth: "15em",
        maxWidth: "20em",
        ":before, :after": {
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          paddingTop: "inherit",
          paddingBottom: "inherit",
          width: "2.8em",
          content: '"\\00a0"',
          fontFamily: "FontAwesome, sans-serif",
          fontSize: "1.2em",
          textAlign: "center",
          transition: "0.2s",
          transformOrigin: "50% 60%",
        },
        ":before": {
          background: "rgba(0, 0, 0, 0.1)",
        },
        ":hover": {
          background: "linear-gradient(to right,rgba(255,0,255,0.8),rgba(0,0,255,0.8));",
        },
        ":active, :focus": {
          background: "#800080",
          outline: "none",
        },
        ":after": {
          content: '"\\F054"',
        },
        "&.arrow": {
          ":hover:after": {
            animation: "bounceright 0.3s alternate ease infinite",
          },
          "@keyframes bounceright": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(3px)" },
          },
        },
      }}
      className="arrow"
    >
      Explore Now
    </Button>
  );
};

export default ExploreButton;
