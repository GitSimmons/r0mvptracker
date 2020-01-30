import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { useLastUpdated } from "./useLastUpdated";
import { useInterval } from "./useInterval";
const StyledHeader = styled.div`
  width: 90%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 2;
  font-family: "Open Sans", Lato, Arial, Helvetica, sans-serif;
  font-size: 14px;
  @media (min-width: 768px) {
    width: 70%;
  }
  padding: 2rem 0 2rem 0;
`;

const Nav = () => {
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState();
  const { loading, lastUpdated } = useLastUpdated();
  useInterval(() => {
    !loading &&
      setTimeSinceLastUpdate(
        Math.floor((new Date().valueOf() / 1000 - lastUpdated) / 60)
      );
  }, 1000);
  return (
    <StyledHeader>
      <Link href="/">
        <img src="/logo.png" />
      </Link>
      {/* <span>An MVP Tracker for Ragna0</span> */}
      <span>Last Updated: {!loading && timeSinceLastUpdate}m</span>
    </StyledHeader>
  );
};

export default Nav;
