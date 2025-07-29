import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication'; 
import Home from "./pages/Home";// Adjust the path as needed
import ShopListing from './pages/ShopListing';
import SignIn from './components/SignIn'; // Adjust the path as needed
import Favourite from './pages/Favourite';
import Cart from "./pages/Cart";
import ProductDetails from './pages/ProductDetails';
import ToastMessage from "./components/ToastMessage";
import { useSelector } from "react-redux";

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text_primary};
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.user);

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
          <Route path="/shop" exact element={<ShopListing />} />
          <Route path="/favorite" exact element={<Favourite />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/shop/:id" exact element={<ProductDetails />} />

          </Routes>
          {openAuth && (
            <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
          )}
           {open && (
            <ToastMessage open={open} message={message} severity={severity} />
          )}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App;
