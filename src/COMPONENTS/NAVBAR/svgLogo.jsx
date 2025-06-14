import { useState } from "react";
import "./NAVBAR.scss";

const SvgLogo = ({ isHover }) => {
  return (
    <div className="LogoSVG">
      <svg
        className={isHover ? "isHover" : ""}
        viewBox="0 0 140 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Frame 1" clipPath="url(#clip0_1_2)">
          <g id="lightGroup">
            <path
              id="lightOne"
              d="M48.0471 50.0943L7.5063 73.4062L7.58796 26.6409L48.0471 50.0943Z"
            />
          </g>
          <g id="darkGroup">
            <path
              id="darkOne"
              d="M89.0471 50.0942L48.5063 73.4062L48.5879 26.6409L89.0471 50.0942Z"
            />
            <path
              id="darkTwo"
              d="M48.0408 50.0943L7.5 73.4062L7.58166 26.6409L48.0408 50.0943Z"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="140" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SvgLogo;
