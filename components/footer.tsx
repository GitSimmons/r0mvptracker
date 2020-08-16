import styled from 'styled-components';

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
  font-family: 'Open Sans', Lato, Arial, Helvetica, sans-serif;
  font-size: 12px;
`;

const LeftPad = styled.div`
  flex-basis: 80%;
  padding: 0.5rem;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-basis: 20%;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <LeftPad>
        Game content and materials are trademarks and copyrights of their respective publisher and
        its licensors. All rights reserved.
      </LeftPad>
      <SocialButtons>
        <a href="https://github.com/GitSimmons/r0mvptracker">
          <img
            src="/static/GitHub-Mark-Light-32px.png"
            alt="GitHub Icon"
            height="32px"
            width="32px"
          />
        </a>
        <a href="https://discordapp.com/users/152516426857578496">
          <img src="/static/Discord-Logo-White.png" alt="Discord Icon" height="36px" width="36px" />
        </a>
      </SocialButtons>
    </StyledFooter>
  );
};

export default Footer;
