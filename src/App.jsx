import React from 'react';
import { ThemeProvider } from '@emotion/react';
import Header from "@components/ui/Header";
import Main from "@ui/Main";
import Catalogue from "@components/catalogue/Catalogue";
import CartContextProvider from '@store/Cart-Context';
import ProductsContextProvider from '@store/Products-Provider'



function App() {
  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <Header />
        <Main />
        <Catalogue />
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
