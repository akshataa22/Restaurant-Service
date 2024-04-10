import logo from './logo.svg';
import './App.css';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="App">
      <h1>Restaurant Service</h1>
      <br/>
      <ProductForm />
      <br />
      <OrderForm />
    </div>
  );
}

export default App;
