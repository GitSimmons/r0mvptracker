import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { useLastUpdated } from "./useLastUpdated";
import { useInterval } from "./useInterval";
import { differenceInSeconds } from "date-fns";

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: black;
  min-height: 2rem;
  color: lightgrey;
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-family: "Open Sans", Lato, Arial, Helvetica, sans-serif;
  font-size: 12px;
`;
// const StyledSocialLink = styled.div`
//   background: #7289da;
//   border-radius: 5px;
//   height: 100%;
//   display: flex;
//   place-items: center;
//   padding: 0.5rem;
// `;
const LeftPad = styled.div`
  padding: 0.5rem 1rem;
`;
const Footer = () => {
  return (
    <StyledFooter>
      <LeftPad>
        Game content and materials are trademarks and copyrights of their
        respective publisher and its licensors. All rights reserved.
      </LeftPad>
    </StyledFooter>
  );
};

export default Footer;
