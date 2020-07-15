import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import MVP from '../components/mvpTable';
import Footer from '../components/footer';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.75) 100%
    ),
    url("https://res.cloudinary.com/acloudforben/image/upload/f_auto/v1578003080/background2156x1080.jpg");
    background-size: inherit;
  background-position: top;
  @media (min-height : 1080px)  {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.75) 100%
    ), url("https://res.cloudinary.com/acloudforben/image/upload/f_auto/v1578002789/background.jpg");
  }
  }
`;
const StyledPage = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow: hidden;
`;
const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Home: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <StyledPage>
        <Head>
          <title>MVP Tracker</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Center>
          <Nav />
          <MVP />
        </Center>
        <Footer />
      </StyledPage>
    </>
  );
};

export default Home;
