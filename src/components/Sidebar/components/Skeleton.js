// @flow
import React from "react";
import styled from "styled-components";

const Skeleton = () => (
  <>
    {[...Array(5).keys()].map(el => (
      <SkeletonBox key={el} layer={el} />
    ))}
  </>
);

const SkeletonBox = styled.div`
  display: inline-block;
  height: 18px;
  width: calc(100% - 16px);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  background-color: rgb(79 84 92 / 32%);
  margin: 7px 8px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(220, 221, 222, 0) 0,
      rgba(220, 221, 222, 0.05) 20%,
      rgba(220, 221, 222, 0.2) 60%,
      rgba(220, 221, 222, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default Skeleton;
