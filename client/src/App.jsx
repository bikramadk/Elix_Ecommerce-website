import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication'; 
import Home from "./pages/Home";// Adjust the path as needed
import SignIn from './components/SignIn'; // Adjust the path as needed

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text_primary};
`;

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container>
          <Navbar openAuth={openAuth} setOpenAuth={setOpenAuth} />
          <Routes>
          <Route path="/" exact element={<Home />} />
          

          </Routes>
          {openAuth && (
            <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
          )}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App;
