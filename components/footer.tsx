import styled from "styled-components";

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

const LeftPad = styled.div`
  padding: 0.5rem 1rem;
`;
const Footer: React.FC = () => {
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
