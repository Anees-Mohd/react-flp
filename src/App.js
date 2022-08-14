import Home from './components/home';
import Form from './components/form';
import Footer from './components/footer';
import Popularmenu from "./components/popular";
import Cart from "./components/cart";
import { useSelector } from 'react-redux';
const App = () => {

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  return (<>
    <Home />
    {showCart && <Cart />}
    <Form />
    <Popularmenu />
    <Footer />
  </>);
}

export default App;