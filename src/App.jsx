import Header from "@components/ui/Header";
import Main from "@ui/Main";
import Catalogue from "@components/catalogue/Catalogue";
import CartContextProvider from '@store/Cart-Context';



function App() {
  return (
    <CartContextProvider>
      <Header />
      <Main />
      <Catalogue />
    </CartContextProvider>
  );
}

export default App;
